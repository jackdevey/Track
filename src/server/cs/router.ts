import { createRouter } from "../context";
import { z } from "zod";
import { get } from "./get";

/**
 * Router for class
 */

export const router = createRouter()
    // cs.get
    .query("get", {
        input: z
            .object({
                classNo: z.string()
            }),
        async resolve({ ctx, input }) { 
            return await get(ctx, input.classNo);
        },
    })