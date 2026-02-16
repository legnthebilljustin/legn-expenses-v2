import { useQuery } from "@tanstack/react-query";

import api from "@/config/axiosInstance";
import { validateFetchedCategoriesList } from "@/validators/expenses-validators";

// TODO: this is really just a temporary hook, since the categories will eventually be stored in a global state, 
// so this will just be used to fetch the categories on app load and then the data will be accessed from the global state instead
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