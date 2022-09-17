import { OperatingCompany } from "@prisma/client";
import { Context } from "../../router/context";
import * as trpc from '@trpc/server';

/**
   * Gets data about a single operating company matching the code provided
   * @param ctx Context for db
   * @param code The code of the company e.g. lm or xc
   * @returns The rolling stock data as type OperatingCompany
   */

export default async function operatingCompanyGet(ctx: Context, code: string): Promise<OperatingCompany> {
    try {
        // Try and find the company in the db
        let oc: OperatingCompany = await ctx.prisma.operatingCompany.findUniqueOrThrow({
            where: { code: code }
        });
        // Return the company
        return oc;
    } catch(e) {
        // Assume if gone wrong, company wasn't found
        throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: `Operating company with the code ${code} could not be found`,
            cause: code
        });
    };
}