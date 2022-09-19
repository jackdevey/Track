import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Get a single operating company
 * @param ctx
 * @param code
 * @returns OperatorFull
 */

export async function get(ctx: Context, code: string): Promise<OperatorFull> {
    try {
        return await ctx.prisma.operator.findUniqueOrThrow({
            where: { code: code },
            include: { 
                operatorSets: {
                    orderBy: {
                        class: {
                            no: 'asc',
                        },
                    },
                    include: { 
                        class: { 
                            include: { 
                                manufacturer: true 
                            } 
                        }, 
                        _count: {
                            select: {
                                rstock: true
                            }
                        }
                    }
                }
            }
        });
    } catch(e) {
        // Throw 404 on error
        Errors.throw404();
    };
}