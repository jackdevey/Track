import * as trpc from '@trpc/server';

export namespace Errors {

    /**
     * Throw a generic 404 error
     * for trpc
     */

    export function throw404() {
        throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: `Requested resource could not be found`
        });
    }

    /**
     * Throw a 401 error code
     * for trpc
     */

     export function throw401() {
        throw new trpc.TRPCError({
            code: 'UNAUTHORIZED',
            message: `You must be logged in to use this resource`
        });
    }

}