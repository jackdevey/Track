import { createRouter } from "./context";
import { z } from "zod";

export const sightingRouter = createRouter()
    // sighting.create
    .mutation('create', {
        input: z
            .object({ 
                trainId: z.string(),
                location: z.string(),
                date: z.date()
            }),
        async resolve({ ctx, input }) {
            
        },
    });