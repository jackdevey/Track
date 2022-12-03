import { createRouter } from "../context";
import { z } from "zod";
import { get } from "./get";
import { resolve } from "path";
import { getMany } from "./getMany";

/**
 * Router for manufacturer
 */

export const router = createRouter()
    // mf.get
    .query("get", {
        input: z
            .object({
                id: z.string()
            }),
        async resolve({ ctx, input }) { 
            return await get(ctx, input.id);
        },
    })
    .query("getMany", {
        async resolve({ ctx }) {
            return await getMany(ctx);
        }
    })