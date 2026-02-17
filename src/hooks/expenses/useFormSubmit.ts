import api from "@/config/axiosInstance";
import { ExpenseItem } from "@/schemas/ExpenseSchema";
import { AppErrorHandler } from "@/utils/errorService";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function useFormSubmit() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = async (purchaseDate: string, formData: ExpenseItem[]) => {
        if (!purchaseDate || !Array.isArray(formData) || formData.length === 0) {
            return;
        }
        setIsSubmitting(true);

        try {
            await mutation.mutateAsync({ expenses: formData, purchaseDate });

            addToast({
                title: "Expenses submitted successfully!",
                color: "success",
                timeout: 3000
            })

            return true
        } catch (error) {
            const { message } = AppErrorHandler(error);

            addToast({
                title: "Failed to submit expenses.",
                description: message,
                color: "danger",
                timeout: 5000
            });

            throw error
        } finally {
            setIsSubmitting(false);
        }
    };

    const mutation = useMutation({
        mutationFn: async({ expenses, purchaseDate }: { expenses: ExpenseItem[], purchaseDate: string}) => {
            return await api.post("/v1/expenses", { purchaseDate, expenses})
        }
    })

    return {
        submitForm,
        isSubmitting
    };
}   