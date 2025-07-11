"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { FolderIcon, ClockIcon } from "lucide-react";

export const ProjectsList = () => {
  const trpc = useTRPC();
  const { user } = useUser();
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  if (!user) return null;

  return (
    <div className="w-full bg-white/90 dark:bg-sidebar/80 rounded-2xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-sm backdrop-blur-sm mb-16 flex flex-col gap-y-6 sm:gap-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-foreground">
          <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {user?.firstName}&apos;s
          </span>{" "}
          Past Auras
          <span className="ml-2 inline-flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full px-2.5 py-0.5">
            999+
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {projects?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
              <FolderIcon className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-base text-muted-foreground">
              No projects found yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first project above
            </p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start p-5 border-purple-100 dark:border-purple-900/30 bg-white/50 dark:bg-sidebar/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200 backdrop-blur-sm"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Image
                    src="/logo.svg"
                    alt="Aura"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="truncate font-medium text-foreground">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1 opacity-70" />
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
