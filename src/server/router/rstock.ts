import { createRouter } from "./context";
import { z } from "zod";
import rstockGet from "../funcs/rstock/get";
import rstockGetSomeFromOperator from "../funcs/rstock/getSomeFromOperator";

export const rstockRouter = createRouter()
    // rstock.get
    .query("get", {
        input: z
            .object({
                identifier: z.string(),
            }),
        async resolve({ ctx, input }) { 
            return await rstockGet(ctx, input.identifier); 
        },
    })

    // rstock.getSomeFromOperator
    .query("getSomeFromOperator", {
        input: z
            .object({
                opCode: z.string(),
                classNo: z.string(),
            }),
        async resolve({ ctx, input }) {
            return await rstockGetSomeFromOperator(ctx, input.opCode, input.classNo);
        },
    })