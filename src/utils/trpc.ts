// src/utils/trpc.ts
import type { Router } from "../server/router";
import { createReactQueryHooks } from "@trpc/react";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";

export const trpc = createReactQueryHooks<Router>();

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof Router["_def"]["queries"],
> = inferProcedureOutput<Router["_def"]["queries"][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof Router["_def"]["queries"],
> = inferProcedureInput<Router["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof Router["_def"]["mutations"],
> = inferProcedureOutput<Router["_def"]["mutations"][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof Router["_def"]["mutations"],
> = inferProcedureInput<Router["_def"]["mutations"][TRouteKey]>;
