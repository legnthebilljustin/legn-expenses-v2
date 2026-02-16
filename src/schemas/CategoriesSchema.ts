import z from "zod";

export const CategoriesSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    icon: z.string().nullable()
});

export type SpendCategory = z.infer<typeof CategoriesSchema>;