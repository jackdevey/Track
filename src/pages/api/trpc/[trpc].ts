// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { router } from "../../../server/router";
import { createContext } from "../../../server/context";

// export API handler
export default createNextApiHandler({
    router,
    createContext,
});
