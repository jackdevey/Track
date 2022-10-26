import { Context } from "../context";

/**
 * Get a multiple rolling stock
 * @param ctx 
 * @returns RStockFull
 */

export async function getMany(ctx: Context, classId: string|null, operatorId: string|null): Promise<RStockFull[]> {
    return await ctx.prisma.rStock.findMany({
        where: { 
            opSet: {
                ...(classId != null) && {classId: classId},
                ...(operatorId != null) && {operatorId: operatorId}
            }
        },
        include: {
            opSet: {
                include: {
                    operator: true
                }
            }
        },
        orderBy: {
            identifier: "asc"
        }
    });
}