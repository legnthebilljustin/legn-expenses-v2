import { addToast } from "@heroui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import api from "@/config/axiosInstance";
import { QUERIES } from "@/constants/enums";
import { AggregateSchema } from "@/schemas/ExpenseSummarySchema";

export default function useFetchExpensesSummary() {
    const {
        data, isPending, isFetching
    } = useQuery({
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        queryKey: [QUERIES.GET_EXPENSES_SUMMARY],
        queryFn: async () => {
            const { data } = await api.get("/v1/overview/allExpenses");

            const validated = AggregateSchema.safeParse(data);
            if (!validated.success) {
                addToast({
                    title: "Data Validation Error",
                    description: "Received data format is invalid. Data displayed may not be accurate.",
                    color: "warning"
                });
                throw new Error("Invalid data format received from server.");
            }
            
            return validated.data;
        },
        select: (data) => {
            const totalAmount = data?.totalAmount ?? 0;
            const totalTransactions: number = data?.totalTransactions ?? 0;

            return {
                list: data?.list || [],
                totalAmount,
                totalTransactions
            };
        }
    });

    return {
        expensesSummaryList: data!.list,
        totalAmount: data!.totalAmount,
        totalTransactions: data!.totalTransactions,
        isLoading: isPending || isFetching
    };
}