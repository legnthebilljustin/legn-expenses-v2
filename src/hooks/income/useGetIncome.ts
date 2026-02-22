import { addToast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

import api from "@/config/axiosInstance";
import { QUERIES } from "@/constants/enums";
import { IncomeSchema } from "@/schemas/IncomeSchema";
import AppError, { AppErrorHandler } from "@/utils/errorService";

export default function useGetIncome() {
    return useQuery({
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
        }
    });
}