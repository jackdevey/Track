import { Class } from "@prisma/client";
import { Context } from "../../router/context";
import * as trpc from '@trpc/server';

export default async function ClassesGet(ctx: Context, classNo: string) {
    try {
        // Try and find the class in the db
        let cls: Class = await ctx.prisma.class.findUniqueOrThrow({
            include: { manufacturer: true },
            where: { no: classNo }
        });
        // Return the class
        return cls;
    } catch(e) {
        // Assume if gone wrong, company wasn't found
        throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: `BR Class with the number ${classNo} could not be found`,
            cause: classNo
        });
    };
}