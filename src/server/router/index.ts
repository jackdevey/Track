// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { rstockRouter } from "./rstock";
import { sightingRouter } from "./sighting";
import { operatingCompanyRouter } from "./operatingCompany";
import { classesRouter } from "./classes";
import { operatorSetRouter } from "./operatorSets";

export const appRouter = createRouter()
  	.transformer(superjson)
  	.merge("rstock.", rstockRouter)
	.merge("sighting.", sightingRouter)
	.merge("operatingCompany.", operatingCompanyRouter)
	.merge("classes.", classesRouter)
	.merge("operatorSet.", operatorSetRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
