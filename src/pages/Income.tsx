import DefaultLayout from "@/layouts/default";
import IncomeForm from "@/features/income/IncomeForm";
import IncomeList from "@/features/income/IncomeList";

export default function Income() {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Income Page</h1>
                <p className="text-slate-400 mb-4">This is where you will manage your income sources and transactions.</p>
                <IncomeForm />
                <IncomeList />
            </div>
        </DefaultLayout>
    );
}