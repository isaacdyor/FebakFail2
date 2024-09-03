import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { conversations, insertConversation } from "@/server/db/schema";

import { and, eq } from "drizzle-orm";

export const conversationsRouter = createTRPCRouter({
  create: publicProcedure
    .input(insertConversation)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(conversations).values({
        id: input.id,
        userId: input.userId,
        visitorId: input.visitorId,
      });
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const activeVisitors = await ctx.db.query.conversations.findMany({
      where: and(eq(conversations.userId, ctx.user.id)),
      orderBy: (visitors, { desc }) => [desc(visitors.createdAt)],
    });

    return activeVisitors.length > 0 ? activeVisitors : null;
  }),
});
