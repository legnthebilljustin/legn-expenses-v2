import { addToast } from "@heroui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import z from "zod";

import api from "@/config/axiosInstance";
import { QUERIES } from "@/constants/enums";
import { IncomeSchema } from "@/schemas/IncomeSchema";
import AppError, { AppErrorHandler } from "@/utils/errorService";

export default function useGetIncome() {
    const {
        data,
        isPending,
        isFetching
    } = useQuery({
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        queryKey: [QUERIES.GET_INCOME],
        queryFn: async () => {
            try {
                const response = await api.get("/v1/income");
                const validated = z.array(IncomeSchema).safeParse(response.data);

                if (validated.success === false) {
                    throw new AppError(400, "Invalid data format received from server.");
                }
                
                return validated.data;            
            } catch (error) {
                const { message } = AppErrorHandler(error);
                
                addToast({
                    title: "Failed to fetch income transactions.",
                    description: message,
                    color: "danger"
                });
                throw error;
            }
        },
        select: (data) => {
            const totalIncome = data.reduce((sum, item) => sum + item.amount, 0);
            return {
                incomeRecords: data,
                totalIncome
            };
        }
    });

    return {
        incomeRecords: data?.incomeRecords || [],
        totalIncome: data?.totalIncome || 0,
        isLoading: isPending || isFetching
        
    };
}