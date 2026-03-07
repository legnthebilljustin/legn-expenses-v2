import CategoryList from "@/features/expenses/CategoryList";
import DefaultLayout from "@/layouts/default";
import ExpensesList from "@/features/expenses/ExpensesList";
import useFetchCategoryStats from "@/hooks/dashboard/useFetchCategoryStats";

export default function Expenses() {
    const {
        data,
        isLoading
    } = useFetchCategoryStats();
    return (
        <DefaultLayout>
            <div>
                <CategoryList categories={data} isLoaded={!isLoading} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="col-span-5 xl:col-span-4">
                    <ExpensesList />
                </div>
            </div>
        </DefaultLayout>
    );
}