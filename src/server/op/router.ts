import { createRouter } from "../context";
import { z } from "zod";
import { get } from "./get";

/**
 * Router for operator
 */

export const router = createRouter()
    // op.get
    .query("get", {
        input: z
            .object({
                code: z.string().min(2).max(3)
            }),
        async resolve({ ctx, input }) { 
            return await get(ctx, input.code);
        },
    })    