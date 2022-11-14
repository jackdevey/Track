import { Operator } from "@prisma/client";
import { Context } from "../context";

export async function search(ctx: Context, term: string): Promise<Operator[]> {
    return await ctx.prisma.operator.findMany({
        where: {
            OR: [
                { name: { contains: term }},
                { shortName: { contains: term }},
                { code: { equals: term }},
            ]
        }
    });
}