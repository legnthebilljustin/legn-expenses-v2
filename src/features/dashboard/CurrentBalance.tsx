import { Skeleton, Spinner } from "@heroui/react";

import CurrencyText from "@/components/CurrencyText";
import CustomDonut from "@/components/Donut";
import SubtitleText from "@/components/SubtitleText";
import { convertToCurrency } from "@/utils/currency";

const data = [
    { label: "Income", value: 20000, color: "#10b956ff" },
    { label: "Expenses", value: 3000, color: "#fa602cff"}
]; 

interface Props {
    isLoading: boolean;
    totalIncome: number;
    totalExpenses: number
}

export default function CurrentBalance({ isLoading, totalIncome, totalExpenses }: Props) {
    return (
        <div className="my-4 py-3 px-2">
            <div>
                <SubtitleText text="Income" />
                {isLoading ? <Skeleton className="w-24 h-6 rounded-full" /> : <CurrencyText amount={totalIncome} />}
            </div>
            { isLoading ? <div className="text-center mt-16 mb-16"><Spinner size="lg" /> </div>
                : (
                    <CustomDonut centerTextData={convertToCurrency(totalIncome - totalExpenses)}
                        data={data}
                        donutSize={300}
                        showCenterText={true}
                        showLegend={false}
                        subtitle="Total"
                    />
                )
            }
            <div className="text-right">
                <SubtitleText text="Expenses" />
                { isLoading ? <Skeleton className="w-24 h-6 rounded-full ml-auto" /> : <CurrencyText amount={totalExpenses} /> }
            </div>
        </div>
    );
}