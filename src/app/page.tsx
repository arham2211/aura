"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const { data: messages } =useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created");
      },
    })
  );
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({ value: value })}
      >
        Invoke Background Job
      </Button>
      {JSON.stringify(messages, null, 2)}
    </div>
  );
};
export default Page;
