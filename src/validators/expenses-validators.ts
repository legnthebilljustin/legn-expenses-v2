import * as z from "zod";

import { GroupedExpensesList, GroupedExpensesListSchema } from "@/schemas/ExpenseSchema";
import AppError from "@/utils/errorService";

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