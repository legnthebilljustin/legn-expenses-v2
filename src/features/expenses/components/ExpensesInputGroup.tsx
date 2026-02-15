import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import React, { useCallback } from "react";

import { DeleteIcon } from "@/assets/icons";
import { SpendCategory } from "@/schemas/CategoriesSchema";
import { ExpenseItem } from "@/schemas/ExpenseSchema";

interface Props {
    paymentMethods: any[]
    categories: SpendCategory[]
    item: ExpenseItem
    removeItem: (itemId: string) => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
}

function ExpensesInputGroup({ 
    categories, paymentMethods, item, removeItem, handleInputChange
}: Props) {
    const referenceId = item.id;

    // this is just to prevent creating a new function on every render, making this a stable reference
    const handleRemove = useCallback(() => removeItem(item.id), [removeItem, item.id]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1400px] mt-3">
            <Input isRequired className="lg:col-span-2" label="Name"
                name="itemName"
                placeholder="Item/Merchant Name"
                value={item.itemName}
                onChange={(e) => handleInputChange(e, referenceId)}
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
            />
            <Select isRequired label="Category" placeholder="Select category"
                selectionMode="single"
            >
                {categories.map((item) => (
                    <SelectItem key={item.id} textValue={item.id}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
            <Select isRequired defaultSelectedKeys={["cash"]} label="Payment Method"
                placeholder="Select payment" selectionMode="single"
            >
                {paymentMethods.map((item) => (
                    <SelectItem key={item.key} textValue={item.name}>{item.name}</SelectItem>
                ))}
            </Select>
            <div className="text-center col-span-2 md:col-span-1 md:text-left">
                <Button isIconOnly color="danger" size="lg" startContent={<DeleteIcon />} variant="light" onPress={handleRemove} />
            </div>
        </div>
    );
    
}

export default React.memo(ExpensesInputGroup);