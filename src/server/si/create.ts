import { Sighting } from "@prisma/client";
import { User } from "next-auth";
import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Create a new sighting
 * @param ctx 
 * @param user 
 * @returns Sighting
 */

export async function create(
    ctx: Context, user: User, rStockIds: string[], 
    location: string, date: Date
): Promise<any> {

    // Round date to nearest day, get rid of hours and minutes etc
    date.setHours(0, 0, 0, 0)

    // See if there is already a sighting for this loc and date
    const sighting = await ctx.prisma.sighting.findFirst({
        where: {
            userId: user.id,
            location: location,
            date: date
        }
    });

    if (sighting != null) {
        // Add the trains to the pre-existing sighting
        try {
            await ctx.prisma.rstockSighting.createMany({
                data: rStockIds.map((id) => ({
                    rstockId: id,
                    sightingId: sighting.id
                }))
            })
        } catch {
            Errors.throw400("already logged on that day u idiot")
        }
    } else {
        return await ctx.prisma.sighting.create({
            data: {
                userId: user.id,
                location: location,
                date: date,
                rStockSightings: {
                    createMany: {
                        data: rStockIds.map((id) => (
                            {rstockId: id}
                        ))
                    }
                }
            }
        });
    }
}