import api from "@/config/axiosInstance";
import { validateFetchedPaymentMethod } from "@/validators/cards-validators";
import { useQuery } from "@tanstack/react-query";

export default function useGetCards() {
    const {
        data = [],
        isLoading
    } = useQuery({
        queryKey: ["getCards"],
        queryFn: async (): Promise<{ id: string, name: string, color: string }[]> => {
            try {
                const response = await api.get("/v1/cards");
                const validated = validateFetchedPaymentMethod(response?.data?.data)
                
                return validated.map(item => ({
                    id: item.id,
                    name: item.name,
                    color: item.color
                }))
            } catch (error) {
                console.error("Error fetching cards:", error);
                throw error;
            }
        },
        retry: 1,
        staleTime: 1000 * 60 * 5
    })

    return {
        paymentMethods: data, 
        isPaymentMethodsLoading: isLoading
    }
}