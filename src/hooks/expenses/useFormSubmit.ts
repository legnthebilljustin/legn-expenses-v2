import { DateValue } from "@heroui/react";

import { ExpenseItem } from "@/schemas/ExpenseSchema";

export default function useFormSubmit() {
    const submitForm = (purchaseDate: DateValue, formData: ExpenseItem[]) => {
        const { year, month, day } = purchaseDate;

        const parsedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    };

    return {
        submitForm
    };
}   