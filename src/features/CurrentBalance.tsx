import CurrencyText from "@/components/CurrencyText";
import CustomDonut from "@/components/Donut";
import SubtitleText from "@/components/SubtitleText";
import { convertToCurrency } from "@/utils/currency";

const data = [
    { label: "Income", value: 20000, color: "#10b956ff" },
    { label: "Expenses", value: 3000, color: "#fa602cff"}
]; 


export default function CurrentBalance() {
    return (
        <div className="my-4 py-3 px-2">
            <div>
                <SubtitleText text="Income" />
                <CurrencyText amount={20000} />
            </div>
            <CustomDonut centerTextData={convertToCurrency(170000)}
                data={data}
                donutSize={300}
                showCenterText={true}
                showLegend={false}
                subtitle="Total"
            />
            <div className="text-right">
                <SubtitleText text="Expenses" />
                <CurrencyText amount={3000} />
            </div>
        </div>
    );
}