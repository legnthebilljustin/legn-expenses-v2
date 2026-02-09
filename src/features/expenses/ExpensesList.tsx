import { Spinner } from "@heroui/react";

import ExpensesTable from "./ExpensesTable";

import useGetExpenses from "@/hooks/expenses/useGetExpenses";
import { GroupedExpensesList } from "@/schemas/ExpenseSchema";

export default function ExpensesList() {
    const {
        groupedExpenses,
        isPending
    } = useGetExpenses();

    if (isPending) {
        return <div className="text-center">
            <Spinner color="primary" variant="wave" />
            <Spinner color="primary" variant="wave" />
            <div className="text-sm font-italic mt-2 text-slate-400">Getting your expenses ready...</div>
        </div>;
    }

    return (
        <div>
            {groupedExpenses.map((group: GroupedExpensesList, index) => (
                <ExpensesTable
                    key={index}
                    expenses={group.expenses}
                    purchaseDate={group.purchaseDate}
                />
            ))}
        </div>
    );
}