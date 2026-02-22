import { addToast, DateValue } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import api from "@/config/axiosInstance";
import queryClient from "@/config/queryClient";
import { QUERIES } from "@/constants/enums";
import { AppErrorHandler } from "@/utils/errorService";
export default function useAddIncome() {
    const [formData, setFormData] = useState({
        receivedDate: "",
        source: "",
        amount: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === "amount" ? parseFloat(value) || 0 : value }));
    };

    const handleDateChange = (date: DateValue | null) => {
        if (date === null) return;

        const { year, month, day } = date;
        const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        setFormData(prev => ({ ...prev, receivedDate: formattedDate }));
    };

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        if (!formData.receivedDate || !formData.source) {
            addToast({
                title: "Please fill in all required fields.",
                color: "warning",
                timeout: 3000
            });
            return;
        }

        if (formData.amount <= 0) {
            addToast({
                title: "Amount must be greater than zero.",
                color: "warning",
                timeout: 3000
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await mutation.mutateAsync(formData);
            setFormData({
                receivedDate: "",
                source: "",
                amount: 0
            });
            return; 
        } catch (error) {
            const { message } = AppErrorHandler(error);

            addToast({
                title: "Failed to submit income.",
                description: message,
                color: "danger",
                timeout: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const mutation = useMutation({
        mutationFn: async(data: typeof formData) => {
            return await api.post("/v1/income", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.GET_INCOME] });

            addToast({
                title: "Income added successfully!",
                color: "success",
                timeout: 3000
            });
        },
    });

    return {
        formData,
        handleInputChange,
        handleDateChange,
        isSubmitting,
        handleSubmit
    };
}