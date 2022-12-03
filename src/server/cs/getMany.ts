import { Class, Operator } from "@prisma/client";
import { Context } from "../context";

/**
 * Get many classes
 * @param ctx
 * @returns Operator
 */

export async function getMany(ctx: Context): Promise<ClassWithManufacturer[]> {
    return await ctx.prisma.class.findMany({
        orderBy: {
            no: "asc"
        },
        include: {
            manufacturer: true
        }
    })
}