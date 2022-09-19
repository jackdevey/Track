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

}