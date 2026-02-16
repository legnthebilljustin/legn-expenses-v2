import { useQuery } from "@tanstack/react-query";

import api from "@/config/axiosInstance";
import { validateFetchedPaymentMethod } from "@/validators/cards-validators";
import { addToast } from "@heroui/react";
import AppError from "@/utils/errorService";

export default function useGetCards() {
    const {
        data = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ["getCards"],
        queryFn: async (): Promise<{ id: string, name: string, color: string }[]> => {
            try {
                const response = await api.get("/v1/cards");
                const validated = validateFetchedPaymentMethod(response?.data?.data);
                
                return validated.map(item => ({
                    id: item.id,
                    name: item.name,
                    color: item.color
                }));
            } catch (error) {
                const message = error instanceof AppError || error instanceof Error ? error.message
                    : "An unknown error occurred while fetching cards.";

                addToast({
                    title: "Failed to fetch cards",
                    description: message,
                    color: "danger"
                });
                throw error;
            }
        },
        retry: 1,
        staleTime: 1000 * 60 * 5
    });

    return {
        paymentMethods: data, 
        isPaymentMethodsLoading: isLoading,
        didPaymentMethodsFetchFAil: isError
    };
}