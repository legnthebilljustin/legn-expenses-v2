import * as z from "zod";

import { GroupedExpensesList, GroupedExpensesListSchema } from "@/schemas/ExpenseSchema";
import AppError from "@/utils/errorService";
import { CategoriesSchema, SpendCategory } from "@/schemas/CategoriesSchema";

export const validateFetchedExpensesList = (list: GroupedExpensesList[]): GroupedExpensesList[] => {
    if (!Array.isArray(list)) {
        throw new AppError(400, "Fetched expenses list is not an array!");
    }

    const result = z.array(GroupedExpensesListSchema).safeParse(list);

    if (!result.success) {
        throw new AppError(400, "Fetched expenses list is not valid!");
    }

    return result.data as GroupedExpensesList[];
};

export const validateFetchedCategoriesList = (list: SpendCategory[]): SpendCategory[] => {
    if (!Array.isArray(list)) {
        throw new AppError(400, "Fetched categories list is not an array!");
    }

    try {
        return z.array(CategoriesSchema).parse(list);
    } catch (error) {
        throw new AppError(400, "Fetched categories list data structure is not valid!");
    }
};