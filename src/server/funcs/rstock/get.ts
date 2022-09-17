import { RollingStock } from "@prisma/client";
import { Context } from "../../router/context";
import * as trpc from '@trpc/server';

/**
   * Gets data about a single rolling stock matching the identifier provided
   * @param ctx Context for db
   * @param identifier The identifier of the rolling e.g. 350101
   * @returns The rolling stock data as type RollingStock
   */

export default async function rstockGet(ctx: Context, identifier: string): Promise<RollingStock> {
    try {
        // Try and find the train in the db
        let rstock: RollingStock = await ctx.prisma.rollingStock.findUniqueOrThrow({
            where: { identifier: identifier },
            include: { 
                operator: true, 
                class: {
                    include: {
                        manufacturer: true
                    }
                }
            }
        });
        // Return the rolling stock
        return rstock;
    } catch(e) {
        // Assume if gone wrong, train wasn't found
        throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: `Rolling stock with the identifier ${identifier} could not be found`,
            cause: identifier
        });
    };
}