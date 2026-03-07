import { z } from "zod";

export const ExpenseSummarySchema = z.object({
    amount: z.number(),
    transactions: z.number(),
    date: z.string(),
});

export const AggregateSchema = z.object({
    totalAmount: z.number(),
    totalTransactions: z.number(),
    list: z.array(ExpenseSummarySchema)
});

export type ExpenseSummary = z.infer<typeof ExpenseSummarySchema>;