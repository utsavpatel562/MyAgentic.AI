import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema, agentUpdateSchema } from "../schema";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql} from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    update: protectedProcedure.input(agentUpdateSchema).mutation(async({ctx, input})=> {

    /**
     * Update the agent record
     * - Only update if agent belongs to the current user (ctx.auth.user.id)
     * - Returns the updated agent
    */

        const [updatedAgent] = await db.update(agents).set(input)
        .where(
            and(
                eq(agents.id, input.id),
                eq(agents.userId, ctx.auth.user.id)
            )
        )
        .returning()
        // If no agent was updated -> throw error
        if(!updatedAgent) {
            throw new TRPCError( {
                code: "NOT_FOUND",
                message: "Agent not found",
            })
        }
        return updatedAgent;
    }),
    remove: protectedProcedure.input(z.object({id: z.string()})).mutation(async({ctx, input})=> {

    /**
     * Delete the agent record
     * - Only delete if agent belongs to the current user
     * - Returns the deleted agent
    */

        const [removeAgent] = await db.delete(agents).where(
            and(
                eq(agents.id, input.id),
                eq(agents.userId, ctx.auth.user.id),
            ),
        )
        .returning();
        // If no agent was deleted -> throw error
        if (!removeAgent) {
            throw new TRPCError( {
                code: "NOT_FOUND",
                message: "Agent not found",
            })
        }
        return removeAgent;
    }),
    // "getMany" endpoint: Fetches all agents from the database.
    getOne : protectedProcedure.input(z.object({id : z.string()})).query(async ({input, ctx})=> {
        // Select all columns from the "agents" table.
        const [existingAgent] = await db.select(
           {
            meetingCount: sql<number>`5`,
             ...getTableColumns(agents),
           }
        ).from(agents).where(and(eq(agents.id, input.id),
        eq(agents.userId, ctx.auth.user.id),
    )
)
if(!existingAgent) {
    throw new TRPCError({code : "NOT_FOUND", message : "Agent not found"});
}

        return existingAgent;
    }),
    
    getMany : protectedProcedure. 
    input(z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),search: z.string().nullish(),
        }))
        .query(async ( {ctx, input})=> {
        const  {search, page, pageSize} =  input;

    /**
     * Fetch paginated agents for the logged-in user.
     * - Selects all columns from "agents"
     * - Adds a placeholder meetingCount (currently hardcoded `5`)
     * - Filters by search term if provided
     */

        const data = await db.select( 
        {
            meetingCount: sql<number>`5`,
             ...getTableColumns(agents),
        }
        ).from(agents).where (
            and (
                eq(agents.userId, ctx.auth.user.id),
                search ? ilike(agents.name, `%${search}%`) : undefined
            )
        )
        .orderBy (desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

        // Count total agents for pagination
        const [total] = await db
        .select({count: count()})
        .from(agents).where (
            and (
                eq(agents.userId, ctx.auth.user.id),
                search ? ilike(agents.name, `%${search}%`) : undefined
            )
        )

        // Calculate total pages
        const totalPages = Math.ceil(total.count / pageSize)

        return {
            items : data,
            total: total.count,
            totalPages,
        }
    }),
    create: protectedProcedure.input(agentInsertSchema).mutation(async ({input, ctx})=> {

    /**
     * Insert a new agent.
     * - Spread input fields
     * - Attach the current user’s ID (ownership enforcement)
    */

        const [createdAgent] = await db
        .insert(agents).values({
            ...input,
            userId: ctx.auth.user.id
        })
        .returning();
        return createdAgent;
    })
})