import { useQuery } from "@tanstack/react-query";

import api from "@/config/axiosInstance";
import { validateFetchedCategoriesList } from "@/validators/expenses-validators";

export default function useGetCategories() {
    const {
        data = [],
        isLoading
    } = useQuery({
        queryKey: ["getCategories"],
        queryFn: async () => {
            try {
                const response = await api.get("/v1/spend-categories");

                const validated = validateFetchedCategoriesList(response.data.categories);
                
                return validated;
            } catch (error) {
                // show toast here informing of the error
                throw error;
            }
        },
        retry: 1,
        staleTime: 1000 * 60 * 5
    });

    return {
        spendCategories: data,
        isLoading,
    };
}