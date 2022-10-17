import { User } from "next-auth";
import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Get all sightings
 * @param ctx 
 * @param user 
 * @returns SightingFull
 */

export async function getAll(ctx: Context, user: User): Promise<SightingFull[]> {
    return await ctx.prisma.sighting.findMany({
        where: { userId: user.id },
        include: {
            rstock: {
                include: {
                    opSet: {
                        include: {
                            operator: true,
                            class: true
                        }
                    }
                }
            }
        }
    });
}