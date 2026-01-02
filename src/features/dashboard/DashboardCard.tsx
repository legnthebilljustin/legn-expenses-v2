import { Card } from "@heroui/react";

import CurrencyText from "@/components/CurrencyText";
import SubtitleText from "@/components/SubtitleText";

export default function DashboardCard() {
    return (
        <Card className="max-w-[300px] shadow-xl border-none py-1 px-3">
            <div className="flex justify-between items-center w-full py-1 mb-2">
                <h1 className="text-sm font-black tracking-tight ">
                    December Expenses
                </h1>
                <div>|</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
                <div className="lg:col-span-2" />
                <div className="text-right">
                    <SubtitleText text="Spent" />
                    <CurrencyText amount={29093.00} />
                    <SubtitleText text="Received" />
                    <CurrencyText amount={70000.00} />
                </div>
            </div>
        </Card>
    );
};
