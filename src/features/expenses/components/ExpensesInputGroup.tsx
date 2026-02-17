import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import React, { useCallback } from "react";

import { DeleteIcon } from "@/assets/icons";
import { SpendCategory } from "@/schemas/CategoriesSchema";
import { ExpenseItem } from "@/schemas/ExpenseSchema";
import { CategoryDetails } from "@/hooks/expenses/useExpensesFormData";

interface Props {
    paymentMethods: { id: string, name: string, color: string }[]
    categories: SpendCategory[]
    item: ExpenseItem
    disableFields?: boolean
    removeItem: (itemId: string) => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
    handleSpendCategoryChange: (itemId: string, categoryId: string, details: CategoryDetails) => void
    handlePaymentMethodChange: (itemId: string, cardId: string, cardDetails: { name: string, color: string }) => void
}

function ExpensesInputGroup({ 
    categories, paymentMethods, item, disableFields, removeItem, handleInputChange,
    handleSpendCategoryChange, handlePaymentMethodChange
}: Props) {
    const referenceId = item.id;

    // this is just to prevent creating a new function on every render, making this a stable reference
    const handleRemove = useCallback(() => removeItem(item.id), [removeItem, item.id]);
    
    const handleCategoryChange = useCallback((event: React.ChangeEvent<any>) => {
        
        const categoryId = event.target.value;
        const categoryDetails = categories.find(category => category.id === categoryId);

        if (!categoryDetails) return;

        handleSpendCategoryChange(referenceId, categoryId, {
            name: categoryDetails.name,
            color: categoryDetails.color
        });
    }, [categories, handleSpendCategoryChange, referenceId]);

    const handlePMChange = useCallback((event: React.ChangeEvent<any>) => {
        const cardId = event.target.value;
        const cardDetails = paymentMethods.find(card => card.id === cardId);

        if (!cardDetails) return;

        handlePaymentMethodChange(referenceId, cardId, {
            name: cardDetails.name,
            color: cardDetails.color
        });
    }, [paymentMethods, handlePaymentMethodChange, referenceId]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1400px] mt-3">
            <Input isRequired className="lg:col-span-2" label="Name"
                name="itemName"
                placeholder="Item/Merchant Name"
                value={item.itemName}
                onChange={(e) => handleInputChange(e, referenceId)}
                isDisabled={disableFields}
            />
            <Input isRequired
                label="Price"
                name="price"
                placeholder="0.00"
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">&#8369;</span>
                    </div>
                }
                type="number"
                value={item.price.toString()}
                onChange={(e) => handleInputChange(e, referenceId)}
                isDisabled={disableFields}
            />
            <Select isRequired label="Category" placeholder="Select category"
                selectionMode="single"
                onChange={(event) => handleCategoryChange(event)}
                isDisabled={disableFields}
            >
                {categories.map((category) => (
                    <SelectItem key={category.id} 
                        textValue={category.name}
                    >
                        {category.name}
                    </SelectItem>
                ))}
            </Select>
            <Select isRequired label="Payment Method"
                placeholder="Select payment" selectionMode="single"
                onChange={(event) => handlePMChange(event)}
                isDisabled={disableFields}
            >
                {paymentMethods.map((item) => (
                    <SelectItem key={item.id} textValue={item.name}>{item.name}</SelectItem>
                ))}
            </Select>
            <div className="text-center col-span-2 md:col-span-1 md:text-left">
                <Button isIconOnly color="danger" size="lg" 
                    startContent={<DeleteIcon />} variant="light" 
                    onPress={handleRemove} 
                    isDisabled={disableFields} 
                />
            </div>
        </div>
    );
    
}

export default React.memo(ExpensesInputGroup);