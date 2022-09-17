import { OperatingCompany, OperatorSet } from "@prisma/client";
import { Context } from "../../router/context";
import * as trpc from '@trpc/server';

export default async function operatorSetsGet(ctx: Context, classNo: string): Promise<OperatorSet[]> {
    try {
        // Try and find the operator sets in the db
        let os: OperatorSet[] = await ctx.prisma.operatorSet.findMany({
            include: { operator: true },
            where: { class: { no: classNo } }
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