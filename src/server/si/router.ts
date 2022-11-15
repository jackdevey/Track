import { createRouter } from "../context";
import { z } from "zod";
import { getAll } from "./getAll";
import { Errors } from "../errors";
import { create } from "./create";
import get from "./get";

/**
 * Router for sightings
 */

export const router = createRouter()
    // si.get
    .query("get", {
        input: z
            .object({
                id: z.string(),
            }),
        async resolve({ ctx, input }) {
            // If user logged in
            if (ctx.session?.user) return await get(ctx, input.id)
            // Else throw error
            throw Errors.throw401();
        },
    })
    // si.getAll
    .query("getAll", {
        input: z
            .object({
                rStockId: z.string().nullish(),
                take: z.number().min(0).default(10)
            }),
        async resolve({ ctx, input }) {
            // If user logged in
            if (ctx.session?.user) return await getAll(ctx, ctx.session.user, input.rStockId, input.take)
            // Else throw error
            throw Errors.throw401();
        },
    })
    .mutation("create", {
        input: z
            .object({
                rStockIds: z.array(z.string()),
                location: z.string(),
                date: z.date()
            }),
        async resolve({ ctx, input }) {
            // If user logged in
            if (ctx.session?.user) return await create(ctx, ctx.session.user, 
                input.rStockIds, input.location, input.date)
            // Else throw error
            Errors.throw401();
        }  
    })