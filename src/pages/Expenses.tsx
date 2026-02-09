import { Button } from "@heroui/button";

import CategoryList from "@/features/expenses/CategoryList";
import DefaultLayout from "@/layouts/default";
import { AddIcon } from "@/assets/icons";
import ExpensesList from "@/features/expenses/ExpensesList";

export default function Expenses() {
    return (
        <DefaultLayout>
            <div className="text-right">
                <Button color="primary" startContent={<AddIcon />}>Create Expenses</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="col-span-5 xl:col-span-4">
                    <ExpensesList />
                </div>
                <div className="hidden xl:block pt-4">
                    <CategoryList />
                </div>
            </div>
        </DefaultLayout>
    );
}