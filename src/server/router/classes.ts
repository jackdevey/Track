import { createRouter } from "./context";
import { z } from "zod";
import ClassesGet from "../funcs/classes/get";

export const classesRouter = createRouter()
    // classes.get
    .query("get", {
        input: z
            .object({
                classNo: z.string(),
            }),
        async resolve({ ctx, input }) { 
            return await ClassesGet(ctx, input.classNo); 
        },
    })