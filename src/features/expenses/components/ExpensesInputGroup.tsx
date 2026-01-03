import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";

import { DeleteIcon } from "@/assets/icons";

interface Props {
    paymentMethods: any[]
    categories: any[]
}

export default function ExpensesInputGroup({ categories, paymentMethods }: Props) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1400px] mt-3">
        <Input isRequired className="lg:col-span-2" label="Name"
            placeholder="Item/Merchant Name"
        />
        <Input isRequired
            label="Price"
            placeholder="0.00"
            startContent={
                <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">&#8369;</span>
                </div>
            }
            type="number"
        />
        <Select isRequired label="Category" placeholder="Select category"
            selectionMode="single"
        >
            {categories.map((item) => (
                <SelectItem key={item.key}>{item.name}</SelectItem>
            ))}
        </Select>
        <Select isRequired defaultSelectedKeys={["cash"]} label="Payment Method"
            placeholder="Select payment" selectionMode="single"
        >
            {paymentMethods.map((item) => (
                <SelectItem key={item.key}>{item.name}</SelectItem>
            ))}
        </Select>
        <div className="text-center col-span-2 md:col-span-1 md:text-left">
            <Button isIconOnly color="danger" size="lg" startContent={<DeleteIcon />} variant="light" />
        </div>
    </div>;
}