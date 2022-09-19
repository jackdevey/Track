import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Get a operator set
 * @param ctx 
 * @param opCode 
 * @param classNo 
 * @returns OperatorSetFull
 */

export async function get(ctx: Context, opCode: string, classNo: string): Promise<OperatorSetFull> {
    try {
        return await ctx.prisma.operatorSet.findFirstOrThrow({
            include: { 
                operator: true, 
                rstock: true, 
                class: { 
                    include: { 
                        manufacturer: true 
                    }
                } 
            },
            where: {
                class: { 
                    no: classNo 
                }, 
                operator: { 
                    code: opCode 
                } 
            }
        });
    } catch(e) {
        // Throw 404 on error
        Errors.throw404();
    };
}