import { createRouter } from "../context";
import { z } from "zod";
import { get } from "./get";

/**
 * Router for rolling stock
 */

export const router = createRouter()
    // rs.get
    .query("get", {
        input: z
            .object({
                identifier: z.string().max(6).min(5)
            }),
        async resolve({ ctx, input }) { 
            return await get(ctx, input.identifier);
        },
    })