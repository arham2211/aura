"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const Page = () => {

  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: ()=>{
      toast.success("Background job started");
    }
  }));
  return <div className="p-4 max-w-7xl mx-auto">
    <Button disabled={invoke.isPending} onClick={() => invoke.mutate({text: "John"})}>Invoke Background Job</Button>
  </div>;
};
export default Page;
