import { createRouter } from "../context";
import { getAll } from "./getAll";
import { Errors } from "../errors";

/**
 * Router for sightings
 */

export const router = createRouter()
    // si.getAll
    .query("getAll", {
        async resolve({ ctx }) {
            // If user logged in
            if (ctx.session?.user) return await getAll(ctx, ctx.session.user)
            // Else throw error
            throw Errors.throw401();
        },
    })