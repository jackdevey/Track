import { createRouter } from "./context";
import { z } from "zod";
import operatingCompanyGet from "../funcs/operatingCompany/get";

export const operatingCompanyRouter = createRouter()
    // rstock.get
    .query("get", {
        input: z
            .object({
                code: z.string()
            }),
        async resolve({ ctx, input }) { 
            return await operatingCompanyGet(ctx, input.code);
        },
    })

    // rstock.getAll
    .query("getAll", {
        async resolve({ ctx }) {
            return await ctx.prisma.example.findMany();
        },
    })