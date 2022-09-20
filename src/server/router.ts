import { createRouter } from "./context";
import superjson from "superjson";
import { router as opRouter } from "./op/router";
import { router as osRouter } from "./os/router";
import { router as rsRouter } from "./rs/router";

export const router = createRouter()
    .transformer(superjson)
    .merge("op.", opRouter)
    .merge("os.", osRouter)
    .merge("rs.", rsRouter)

export type Router = typeof router;