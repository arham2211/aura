import { createTRPCRouter } from '../init';
import { projectsRouter } from '@/modules/projects/server/procedures';
import { messageRouter } from '@/modules/messages/server/procedures';

export const appRouter = createTRPCRouter({

  messages: messageRouter,
  projects: projectsRouter,
      
});
// export type definition of API
export type AppRouter = typeof appRouter;