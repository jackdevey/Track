import { OperatorSet } from "@prisma/client";
import { Context } from "../../router/context";
import * as trpc from '@trpc/server';

export default async function operatorSetsGet(ctx: Context, opCode: string, classNo: string) {
    try {
        // Try and find the operator sets in the db
        let os = await ctx.prisma.operatorSet.findFirstOrThrow({
            include: { operator: true, rstock: true, class: { include: { manufacturer: true }} },
            where: { class: { no: classNo }, operator: { code: opCode } }
        });
        // Return the operator set
        return os;
    } catch(e) {
        // Assume if gone wrong, company wasn't found
        throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: `Operator sets for class ${classNo} could not be found`,
            cause: classNo
        });
    };
}