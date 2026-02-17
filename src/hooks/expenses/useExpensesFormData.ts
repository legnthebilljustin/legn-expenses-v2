import { addToast, DateValue } from "@heroui/react";
import { useCallback, useState } from "react";

import { ExpenseItem } from "@/schemas/ExpenseSchema";
import { isACalendarDate } from "@/utils/date";

export interface CategoryDetails {
    name: string;
    color: string;
}

export default function useExpensesFormData() {
    const [purchaseDate, setPurchaseDate] = useState<string | null>(null);
    const [formData, setFormData] = useState<ExpenseItem[]>([]);

    const addItem = () => {
        const newItem: ExpenseItem = {
            id: crypto.randomUUID(),
            itemName: "",
            price: 0,
            purchaseDate: purchaseDate ? purchaseDate.toString() : "",
            paymentMethodId: "",
            paymentMethodDetails: {
                name: "",
                color: ""
            },
            spendCategoryId: "",
            spendCategoryDetails: {
                name: "",
                color: ""
            }
        };

        setFormData(prev => [...prev, newItem]);
    };

    const resetFields = () => {
        setFormData([]);
        setPurchaseDate(null);
    };

    const removeItem = useCallback((id: string) => {
        setFormData(prev => prev.filter(item => item.id !== id));
    }, []);

    const handlePurchaseDateChange = (value: DateValue | null) => {
        if (value === null) return;

        if (!isACalendarDate(value)) {
            addToast({
                title: "Invalid date format.",
                description: "Please select a valid date.",
                color: "danger"
            });

            return;
        }

        const { year, month, day } = value;
        const parsed = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        setPurchaseDate(parsed);
    };

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { name, value } = event.target;

        if (!name || !value) return;

        setFormData(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        [name]: name === "price" ? parseFloat(value) || 0 : value
                    }
                    : item
            )
        );
    }, []);

    const handleSpendCategoryChange = useCallback((
        id: string, 
        categoryId: string, 
        categoryDetails: CategoryDetails
    ) => {
        setFormData(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        spendCategoryId: categoryId,
                        spendCategoryDetails: categoryDetails
                    }
                    : item
            )
        );
    }, []);

    const handlePaymentMethodChange = useCallback((
        id: string,
        cardId: string,
        cardDetails: { name: string, color: string }
    ) => {
        setFormData(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        paymentMethodId: cardId,
                        paymentMethodDetails: cardDetails
                    }
                    : item
            )
        );
    }, []);

    return {
        formData,
        purchaseDate,
        addItem,
        removeItem,
        handlePurchaseDateChange,
        handleInputChange,
        handleSpendCategoryChange,
        handlePaymentMethodChange,
        resetFields
    };
}