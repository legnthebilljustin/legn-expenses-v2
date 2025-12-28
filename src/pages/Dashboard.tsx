import DefaultLayout from "@/layouts/default";
import DashboardCard from "@/features/DashboardCard";
import SubtitleText from "@/components/SubtitleText";
import SpendCategoryCard from "@/features/SpendCategoryCard";

export default function Dashboard() {
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                <div className="">
                    <h1 className="text-3xl font-bold mb-2">Hello, Bill</h1>
                    <SubtitleText text="Take a look at your current month's balance." />
                    <div className="text-center my-40">
                        <h1 className="text-8xl font-black">G</h1>
                    </div>
                    <SpendCategoryCard />
                </div>
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                        <DashboardCard />
                        <DashboardCard />
                        <DashboardCard />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}