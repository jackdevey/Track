import { createRouter } from "./context";
import { z } from "zod";
import operatorSetsGet from "../funcs/operatorSets/get";

export const operatorSetRouter = createRouter()
    // rstock.get
    .query("get", {
        input: z
            .object({
                classNo: z.string(),
            }),
        async resolve({ ctx, input }) { 
            return await operatorSetsGet(ctx, input.classNo); 
        },
    })