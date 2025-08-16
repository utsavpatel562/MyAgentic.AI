import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { z } from "zod";
import { eq, getTableColumns, sql} from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    // "getMany" endpoint: Fetches all agents from the database.
    getOne : protectedProcedure.input(z.object({id : z.string()})).query(async ({input})=> {
        // Select all columns from the "agents" table.
        const [existingAgent] = await db.select(
           {
            meetingCount: sql<number>`5`,
             ...getTableColumns(agents),
           }
        ).from(agents).where(eq(agents.id, input.id))

        return existingAgent;
    }),
    
    getMany : protectedProcedure. 
    input(z.object({
            page: z.number().default(1),
            pageSize: z.number().min(1).max(100).default(10),search: z.string().nullish(),
        }).optional())
        .query(async ()=> {
        // Select all columns from the "agents" table.
        const data = await db.select( 
        {
            meetingCount: sql<number>`5`,
             ...getTableColumns(agents),
        }
        ).from(agents);

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