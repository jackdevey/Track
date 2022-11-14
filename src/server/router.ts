import { createRouter } from "./context";
import superjson from "superjson";
import { router as csRouter } from "./cs/router";
import { router as mfRouter } from "./mf/router";
import { router as opRouter } from "./op/router";
import { router as osRouter } from "./os/router";
import { router as rsRouter } from "./rs/router";
import { router as siRouter } from "./si/router";
import { z } from "zod";
import search from "./search";

export const router = createRouter()
    .transformer(superjson)
    .merge("cs.", csRouter)
    .merge("mf.", mfRouter)
    .merge("op.", opRouter)
    .merge("os.", osRouter)
    .merge("rs.", rsRouter)
    .merge("si.", siRouter)
    // search mutation
    .mutation("search", {
        input: z
            .object({
                term: z.string().min(2)
            }),
        async resolve({ ctx, input }) {
            return await search(ctx, input.term);
        }
    })

export type Router = typeof router;