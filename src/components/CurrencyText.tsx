import { convertToCurrency } from "@/utils/currency";

export default function CurrencyText({ amount, classes }: { amount: number, classes?: string }) {
    return <div className={`text-sm mb-2 tracking-tight font-light ${classes}`}>{convertToCurrency(amount)}</div>;
}