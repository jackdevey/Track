import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Get a single manufacturer
 * @param ctx
 * @param id
 * @returns OperatorFull
 */

export async function get(ctx: Context, id: string): Promise<ManufacturerFull> {
    try {
        return await ctx.prisma.manufacturer.findUniqueOrThrow({
            where: { id: id },
            include: { 
                classes: true
            }
        });
    } catch(e) {
        // Throw 404 on error
        Errors.throw404();
    };
}