import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Get a single rolling stock
 * @param ctx 
 * @param identifier 
 * @returns RStockFull
 */

export async function get(ctx: Context, identifier: string): Promise<RStockFull> {
    try {
        return await ctx.prisma.rStock.findUniqueOrThrow({
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
    } catch(e) {
        // Throw 404 on error
        Errors.throw404();
    };
}