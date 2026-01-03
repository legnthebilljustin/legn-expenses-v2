import { Button, DatePicker } from "@heroui/react";

import { AddIcon, SendIcon } from "@/assets/icons";
import ExpensesInputGroup from "@/features/expenses/components/ExpensesInputGroup";
import DefaultLayout from "@/layouts/default";


const categories = [
    { key: "food", name: "Food" },
    { key: "clothing", name: "Clothing" },
    { key: "transportation", name: "Transportation" },
    { key: "travel", name: "Travel" },
    { key: "utiliities", name: "Utilities" },
    { key: "electronics", name: "Electronics" },
] as any[];

const payment = [
    { key: "cash", name: "Cash" },
    { key: "bpi", name: "BPI Rewards" },
    { key: "ub", name: "UB Rewards Platinum" },
    { key: "chinabank", name: "Chinabank Platinum" },
];

export default function AddExpenses() {
    return (
        <DefaultLayout>
            <div className="mb-8">
                <div className="font-bold tracking-tight text-xl">Create new expenses</div>
                <div className="text-slate-400 text-sm font-light">Begin by selecting a transaction date. Your active credit cards will be included in the payment method options.</div>
            </div>
			
            <DatePicker isRequired className="max-w-[300px] mb-8" label="Transasction Date" />
            <ExpensesInputGroup 
                categories={categories}
                paymentMethods={payment}
            />
            <ExpensesInputGroup 
                categories={categories}
                paymentMethods={payment}
            />
            <div className="mt-8 mb-4 flex items-center justify-center max-w-[1400px]">
                <Button className="mx-1" color="secondary" size="sm" startContent={<AddIcon />}>Add New Line</Button>
                <Button className="mx-1" color="primary" size="sm" startContent={<SendIcon />}>Submit Expenses</Button>
            </div>
        </DefaultLayout>
    );
}