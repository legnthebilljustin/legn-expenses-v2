import { Spinner } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import IncomeForm from "@/features/income/IncomeForm";
import IncomeList from "@/features/income/IncomeList";
import useGetIncome from "@/hooks/income/useGetIncome";

export default function Income() {
    const {
        data,
        isLoading
    } = useGetIncome();

    return (
        <DefaultLayout>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Income Page</h1>
                <p className="text-slate-400 mb-4">This is where you will manage your income sources and transactions.</p>
                <IncomeForm />
                {isLoading ? (
                    <div className="mt-12 text-center text-slate-500">
                        <Spinner label="Fetching your income records..." />
                    </div>
                ) : (
                    <IncomeList incomeData={data || []} />
                )}
            </div>
        </DefaultLayout>
    );
}