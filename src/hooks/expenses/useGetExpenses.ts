import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import api from "@/config/axiosInstance";
import AppError from "@/utils/errorService";
import { validateFetchedExpensesList } from "@/validators/expenses-validators";

export default function useGetExpenses() {
    const [paginationKey, setPaginationKey] = useState<string | null>(null);
    const [isAllExpensesFetched, setIsAllExpensesFetched] = useState(false);
    
    const {
        data = [],
        isPending,
        refetch
    } = useQuery({
        queryKey: ["expenses", paginationKey],
        queryFn: async () => {
            const response = await api.get("/v1/expenses?paginationKey=null");

            if (!Array.isArray(response.data.expenses)) {
                throw new AppError(500, "Invalid expenses data structure. Expected an array.");
            }

            const pKey = response.data.paginationKey || null;

            if (pKey === undefined) {
                throw new AppError(500, "Invalid pagination key received.");
            }

            if (pKey === null) {
                setIsAllExpensesFetched(true);
            }

            setPaginationKey(pKey);
            const validated = validateFetchedExpensesList(response.data.expenses);

            return validated;
        },

    });

    return {
        groupedExpenses: data,
        isPending,
        refetch,
        isAllExpensesFetched
    };
}