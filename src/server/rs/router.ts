import { createRouter } from "../context";
import { z } from "zod";
import { get } from "./get";
import { getMany } from "./getMany";
import { Errors } from "../errors";

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
    // rs.getMany
    .query("getMany", {
        input: z
            .object({
                classId: z.string().nullable(),
                operatorId: z.string().nullable()
            }),
        async resolve({ ctx, input }) {
            // If neither of these inputs present throw error
            if (input.classId && input.operatorId == null) {
                Errors.throw400();
            }

            return await getMany(ctx, input.classId, input.operatorId)
        }
    })