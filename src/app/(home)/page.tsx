"use client";

import Image from "next/image";
import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";

// const Page = () => {
//   return (
//     <div className="flex flex-col max-w-5xl mx-auto w-full">
//       <section className="space-y-6 py-[16vh] 2xl:py-48">
//         <div className="flex flex-col items-center">
//           <Image
//             src="/logo.svg"
//             alt="Aura"
//             width={90}
//             height={90}
//             className="hidden md:block"
//           />
//         </div>
//         <h1 className="text-2xl md:text-5xl font-bold text-center">
//           Build something with Aura
//         </h1>
//         <p className="text-lg md:text-xl text-center text-muted-foreground">
//           Create apps and websites by chatting with AI
//         </p>
//         <div className="max-w-3xl mx-auto w-full">
//             <ProjectForm />
//         </div>
//       </section>
//       <ProjectsList />
//     </div>
//   );
// };
// export default Page;

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-8 py-[12vh] 2xl:py-32">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-purple-500/20 blur-lg"></div>
            <Image
              src="/logo.svg"
              alt="Aura"
              width={100}
              height={100}
              className="hidden md:block relative z-10 drop-shadow-lg"
            />
          </div>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold text-center bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent leading-tight">
            Build something amazing with Aura
          </h1>
          <p className="text-lg md:text-xl text-center text-muted-foreground">
            Create beautiful apps and websites simply by chatting with AI
          </p>
        </div>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectsList />
    </div>
  );
};
export default Page;