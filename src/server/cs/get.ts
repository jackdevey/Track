import { Context } from "../context";
import { Errors } from "../errors";

/**
 * Get a single class
 * @param ctx
 * @param id
 * @returns OperatorFull
 */

export async function get(ctx: Context, classNo: string): Promise<ClassWithOperatorsAndManufacturer> {
    try {
        return await ctx.prisma.class.findUniqueOrThrow({
            where: { no: classNo },
            include: {
                manufacturer: true,
                operatorSets: {
                    include: {
                        operator: true,
                        rstock: {
                            include: {
                                opSet: {
                                    include: {
                                        operator: true
                                    }
                                }
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