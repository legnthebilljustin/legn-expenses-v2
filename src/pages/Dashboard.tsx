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

export default function Dashboard() {
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="">
                    <h1 className="text-3xl font-bold mb-2">Hello, Bill</h1>
                    <SubtitleText text="Take a look at your current month's balance." />
                    <CurrentBalance />
                    <SpendCategoryCard />
                </div>
                <div className="lg:col-span-2">
                    <HeadingText text="Your Total Metrics" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 mb-4">
                        <MetricsCard icon={BarChartIcon} label="Total Income" value={convertToCurrency(123456.78)} />
                        <MetricsCard icon={ReceiptIcon} label="Total Expenses" value={convertToCurrency(45678.90)} />
                        <MetricsCard icon={WalletIcon} label="Total Tranasctions" value="234" />
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