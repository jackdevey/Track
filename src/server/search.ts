import { Manufacturer } from '@prisma/client';
import { Operator } from '@prisma/client';
import { Context } from './context';
import { search as opSearch } from './op/search';
import { search as mfSearch } from './mf/search';

export default async function search(ctx: Context, term: string): Promise<SearchResults> {
    return {
        op: await opSearch(ctx, term),
        mf: await mfSearch(ctx, term),
    }
}

export interface SearchResults {
    op: Operator[],
    mf: Manufacturer[]
}