import { Errors } from '../errors';
import { Context } from './../context';

export default async function get(ctx: Context, id: string): Promise<SightingFull> {
    try {
        return await ctx.prisma.sighting.findUniqueOrThrow({
            where: { id },
            include: {
                rStockSightings: {
                    include: {
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