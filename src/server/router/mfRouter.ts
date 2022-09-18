import { Manufacturer } from '@prisma/client';
import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from '@trpc/server';

export const mfRouter = createRouter()
    // manufacturer.get
    .query("get", {
        input: z
            .object({
                id: z.string(),
            }),
        async resolve({ ctx, input }) { 
            try {
                // Try and find the manufacturer in the db
                return await ctx.prisma.manufacturer.findUniqueOrThrow({
                    where: { id: input.id },
                    include: { 
                        classes: true
                    }
                });
            } catch(e) {
                // Assume if gone wrong, train wasn't found
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: `Manufacturer with the provided id could not be found!`
                });
            };
        },
    })