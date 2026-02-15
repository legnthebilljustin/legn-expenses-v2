import { addToast, DateValue } from "@heroui/react";
import { useCallback, useState } from "react";

import { ExpenseItem } from "@/schemas/ExpenseSchema";
import { isACalendarDate } from "@/utils/date";

export default function useExpensesFormData() {
    const [purchaseDate, setPurchaseDate] = useState<DateValue | null>(null);
    const [formData, setFormData] = useState<ExpenseItem[]>([]);

    const addItem = () => {
        const newItem: ExpenseItem = {
            id: crypto.randomUUID(),
            card: null,
            cardId: "",
            itemName: "",
            price: 0,
            purchaseDate: purchaseDate ? purchaseDate.toString() : "",
            spendCategoryId: "",
            spendCategoryDetails: {
                name: "",
                color: ""
            }
        };

        setFormData(prev => [...prev, newItem]);
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

        setPurchaseDate(value);
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

    return {
        formData,
        purchaseDate,
        addItem,
        removeItem,
        handlePurchaseDateChange,
        handleInputChange
    };
}