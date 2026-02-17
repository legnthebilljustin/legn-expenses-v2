import * as z from "zod";

export const ExpenseItemSchema = z.object({
    id: z.string(),
    paymentMethodId: z.string(),
    paymentMethodDetails: z.object({
        name: z.string(),
        color: z.string()
    }),
    itemName: z.string(),
    price: z.number(),
    purchaseDate: z.string(),
    spendCategoryId: z.string(),
    spendCategoryDetails: z.object({
        name: z.string(),
        color: z.string()
    })
});

export const GroupedExpensesListSchema = z.object({
    purchaseDate: z.string(),
    expenses: z.array(ExpenseItemSchema)
});

export const ExpenseItemFormDataSchema = ExpenseItemSchema.omit({ id: true, purchaseDate: true });

export type ExpenseItem = z.infer<typeof ExpenseItemSchema>;
export type GroupedExpensesList = z.infer<typeof GroupedExpensesListSchema>;
export type ExpenseItemFormData = z.infer<typeof ExpenseItemFormDataSchema>;