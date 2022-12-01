import { Operator } from "@prisma/client";
import { Context } from "../context";

/**
 * Get many operating company
 * @param ctx
 * @param code
 * @returns Operator
 */

export async function getMany(ctx: Context): Promise<Operator[]> {
    return await ctx.prisma.operator.findMany({
        orderBy: {
            name: "asc"
        }
    })
}