import { Class, Manufacturer, Operator } from "@prisma/client";
import { Context } from "../context";

/**
 * Get many classes
 * @param ctx
 * @returns Operator
 */

export async function getMany(ctx: Context): Promise<Manufacturer[]> {
    return await ctx.prisma.manufacturer.findMany({
        orderBy: {
            name: "asc"
        }
    })
}