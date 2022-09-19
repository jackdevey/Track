import { createRouter } from "../context";
import { z } from "zod";
import { get } from "./get";

/**
 * Router for operator set
 */

export const router = createRouter()
    // os.get
    .query("get", {
        input: z
            .object({
                opCode: z.string().max(3).min(2),
                classNo: z.string().max(3).min(2)
            }),
        async resolve({ ctx, input }) { 
            return await get(ctx, input.opCode, input.classNo);
        },
    })