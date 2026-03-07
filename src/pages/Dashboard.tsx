import DefaultLayout from "@/layouts/default";
import DashboardCard from "@/features/dashboard/DashboardCard";
import SubtitleText from "@/components/SubtitleText";
import SpendCategoryCard from "@/features/dashboard/SpendCategoryCard";
import MetricsCard from "@/features/dashboard/MetricsCard";
import { BarChartIcon, CreditCardIcon, ReceiptIcon, WalletIcon } from "@/assets/icons";
import { convertToCurrency } from "@/utils/currency";
import HeadingText from "@/components/HeadingText";
import RecentExpensesTable from "@/features/dashboard/RecentExpensesTable";
import CurrentBalance from "@/features/dashboard/CurrentBalance";
import useFetchCategoryStats from "@/hooks/dashboard/useFetchCategoryStats";
import useGetIncome from "@/hooks/income/useGetIncome";
import useFetchExpensesSummary from "@/hooks/dashboard/useFetchExpensesSummary";

export default function Dashboard() {
    const {
        totalIncome,
        isLoading: isFetchingIncome
    } = useGetIncome();

    const { 
        data: categoryStats, 
        isLoading: isCategoryStatsLoading,
        totalSpent
    } = useFetchCategoryStats();

    const {
        isLoading: isFetchingExpensesSummary,
        totalAmount,
        totalTransactions
    } = useFetchExpensesSummary();

    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="">
                    <h1 className="text-3xl font-bold mb-2">Hello, Bill</h1>
                    <SubtitleText text="Take a look at your current month's balance." />
                    <CurrentBalance isLoading={isFetchingIncome} 
                        totalExpenses={totalSpent} 
                        totalIncome={totalIncome}
                    />
                    <SpendCategoryCard categoryStats={categoryStats}
                        isLoading={isCategoryStatsLoading}
                        totalSpent={totalSpent}
                    />
                </div>
                <div className="lg:col-span-2">
                    <HeadingText text="Your Total Metrics" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 mb-4">
                        <MetricsCard icon={BarChartIcon} isLoading={isFetchingIncome}
                            label="Total Income"
                            value={convertToCurrency(totalIncome)} 
                        />
                        <MetricsCard icon={ReceiptIcon} isLoading={isFetchingExpensesSummary}
                            label="Total Expenses"
                            value={convertToCurrency(totalAmount)} 
                        />
                        <MetricsCard icon={WalletIcon} isLoading={isFetchingExpensesSummary} 
                            label="Total Tranasctions"
                            value={totalTransactions}
                        />
                        <MetricsCard icon={CreditCardIcon} label="Active Credit Cards" value="5" />
                    </div>
                    <HeadingText text="Your Current Budgets" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-4">
                        <DashboardCard />
                        <DashboardCard />
                        <DashboardCard />
                    </div>
                    
                    <HeadingText text="Your Recent Transactions" />
                    <RecentExpensesTable />
                </div>
            </div>
        </DefaultLayout>
    );
}