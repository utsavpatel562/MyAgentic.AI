import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";

export const agentsRouter = createTRPCRouter({
    // "getMany" endpoint: Fetches all agents from the database.
    getMany : baseProcedure.query(async ()=> {
        // Select all columns from the "agents" table.
        const data = await db.select().from(agents);

        return data;
    }),
    create: protectedProcedure.input(agentInsertSchema).mutation(async ({input, ctx})=> {
        const [createdAgent] = await db
        .insert(agents).values({
            ...input,
            userId: ctx.auth.user.id
        })
        .returning();
        return createdAgent;
    })
})