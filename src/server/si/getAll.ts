import { User } from "next-auth";
import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Get all sightings
 * @param ctx 
 * @param user 
 * @returns SightingFull
 */

export async function getAll(ctx: Context, user: User, rStockId: string, limit: number): Promise<SightingForList[]> {
    return await ctx.prisma.sighting.findMany({
        where: { 
            userId: user.id,
            ...(rStockId != null) && {rStockSightings: {
                some: {
                    rstockId: rStockId
                }
            }},
        },
        take: limit,
        include: {
            rStockSightings: {
                include: {
                    rstock: true
                }
            }
        },
        orderBy: {
            date: "desc"
        }
    });
}