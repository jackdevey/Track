import { RollingStock } from "@prisma/client";
import { Context } from "../../router/context";
import * as trpc from '@trpc/server';

// needs to be redone cus lazy 

export default async function rstockGetSomeFromOperator(ctx: Context, opCode: string, classNo: string): Promise<rStockGetSomeFromOperatorReturn> {
    try {
        // Try and find the train in the db that have been seen
        let rstockSeen = await ctx.prisma.rollingStock.findMany({
            where: {
                operator: {
                    code: opCode
                },
                identifier: {
                    startsWith: classNo
                },
                sightings: {
                    some: {
                        userId: "test"
                    }
                }
            }
        });
        // Try and find the trains that havent been seen
        let rstockUnseen = await ctx.prisma.rollingStock.findMany({
            where: {
                operator: {
                    code: opCode
                },
                identifier: {
                    startsWith: classNo
                },
                sightings: {
                    none: {
                        userId: "test"
                    }
                }
            }
        });
        // Return the rolling stock
        return {
            userSeen: rstockSeen,
            userUnseen: rstockUnseen
        };
    } catch(e) {
        // Assume if gone wrong, train wasn't found
        throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: `ljkljkl`,
            cause: opCode
        });
    };
}

interface rStockGetSomeFromOperatorReturn {
    userSeen: RollingStock[];
    userUnseen: RollingStock[];
}