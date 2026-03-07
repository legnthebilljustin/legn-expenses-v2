import z from "zod";

export const CategoriesSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    icon: z.string().nullable()
});

export const CategoryStatsSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    totalSpent: z.number(),
    totalTransactions: z.number()
});

export type SpendCategory = z.infer<typeof CategoriesSchema>;
export type SpendCategoryStat = z.infer<typeof CategoryStatsSchema>;