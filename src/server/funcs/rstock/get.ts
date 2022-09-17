import { RStock } from "@prisma/client";
import { Context } from "../../router/context";
import * as trpc from '@trpc/server';

/**
   * Gets data about a single rolling stock matching the identifier provided
   * @param ctx Context for db
   * @param identifier The identifier of the rolling e.g. 350101
   * @returns The rolling stock data as type RStock
   */

export default async function rstockGet(ctx: Context, identifier: string): Promise<RStock> {
    try {
        // Try and find the train in the db
        let rstock: RStock = await ctx.prisma.rStock.findUniqueOrThrow({
            where: { identifier: identifier },
            include: { 
                opSet: {
                    include: {
                        operator: true,
                        class: {
                            include: {
                                manufacturer: true
                            }
                        },
                        illustrations: true
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
            message: `Stock with the identifier ${identifier} could not be found`,
            cause: identifier
        });
    };
}