import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    // "getMany" endpoint: Fetches all agents from the database.
    getOne : baseProcedure.input(z.object({id : z.string()})).query(async ({input})=> {
        // Select all columns from the "agents" table.
        const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id))

        return existingAgent;
    }),
    
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