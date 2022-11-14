import { Manufacturer } from "@prisma/client";
import { Context } from "../context";

export async function search(ctx: Context, term: string): Promise<Manufacturer[]> {
    return await ctx.prisma.manufacturer.findMany({
        where: {
            OR: [
                { name: { contains: term }},
                { id: { equals: term }},
            ]
        }
    });
}