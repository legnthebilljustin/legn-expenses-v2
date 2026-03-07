import { addToast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import api from "@/config/axiosInstance";
import { QUERIES } from "@/constants/enums";
import { CategoryStatsSchema } from "@/schemas/CategoriesSchema";

export default function useFetchCategoryStats() {
    const {
        data,
        isPending
    } = useQuery({
        queryKey: [QUERIES.GET_CATEGORY_STATS],
        queryFn: async () => {
            const { data } = await api.get("/v1/spend-categories/category-stats");
        
            const result = z.array(CategoryStatsSchema).safeParse(data.stats);

            if (!result.success) {
                addToast({
                    title: "Unable to display spend category stats.",
                    description: "Received data is in an unexpected format.",
                    color: "danger"
                });

                return [];
            }

            return result.data;
        },
        select: (data) => {
            const totalSpent = data.reduce(
                (sum, category) => sum + category.totalSpent, 0
            );

            const totalTransactions = data.reduce(
                (sum, category) => sum + category.totalTransactions, 0
            );

            return {
                categories: data,
                totalSpent,
                totalTransactions
            };
        }
    });

    return {
        data: data?.categories ?? [],
        totalSpent: data?.totalSpent ?? 0,
        totalTransactions: data?.totalTransactions ?? 0,
        isLoading: isPending
    };
}