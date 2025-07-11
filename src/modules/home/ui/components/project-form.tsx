import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PROJECT_TEMPLATES } from "../../constants";
import { useClerk } from "@clerk/nextjs";

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(1000, { message: "Value is too long" }),
});

export const ProjectForm = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const clerk = useClerk();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.projects.getMany.queryOptions());
        queryClient.invalidateQueries(trpc.usage.status.queryOptions());
        router.push(`/projects/${data.id}`);
      },

      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === "UNAUTHORIZED") {
          clerk.openSignIn();
        }
        if (error.data?.code === "TOO_MANY_REQUESTS") {
          router.push("/pricing");
        }
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    });
  };

  const onSelect = (value: string) => {
    form.setValue("value", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  
  const [isFocused, setIsFocused] = useState(false);
  const isPending = createProject.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;

  return (
    <Form {...form}>
      <section className="space-y-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border p-6 rounded-2xl bg-sidebar dark:bg-sidebar/80 backdrop-blur-sm transition-all",
            isFocused 
              ? "shadow-[0_0_20px_rgba(168,85,247,0.15)] border-purple-500/50" 
              : "border-border/50"
          )}
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                disabled={isPending}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={3}
                maxRows={8}
                className="pt-2 resize-none border-none w-full outline-none bg-transparent text-foreground text-lg"
                placeholder="Describe what you'd like to build with Aura..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
              />
            )}
          />
          <div className="flex gap-x-2 items-end justify-between pt-4">
            <div className="text-[11px] text-muted-foreground font-mono">
              <kbd
                className="ml-auto pointer-events-none inline-flex h-6 
                select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[11px] 
                font-medium text-muted-foreground"
              >
                <span>&#8984;</span>Ctrl+Enter
              </kbd>
              &nbsp;to submit
            </div>
            <Button
              disabled={isButtonDisabled}
              className={cn(
                "size-10 rounded-full bg-purple-600 hover:bg-purple-700 transition-all",
                isButtonDisabled && "bg-muted-foreground border opacity-70"
              )}
            >
              {isPending ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : (
                <ArrowUpIcon className="size-5" />
              )}
            </Button>
          </div>
        </form>
        <div className="flex-wrap justify-center gap-3 hidden md:flex max-w-3xl">
          {PROJECT_TEMPLATES.map((template) => (
            <Button
              key={template.title}
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-sidebar/80 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-900/30 backdrop-blur-sm transition-all duration-200 py-2 px-4"
              onClick={() => onSelect(template.prompt)}
            >
              <span className="mr-2">{template.emoji}</span> {template.title}
            </Button>
          ))}
        </div>
      </section>
    </Form>
  );
};
