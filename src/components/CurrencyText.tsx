import { convertToCurrency } from "@/utils/currency";

export default function CurrencyText({ amount }: { amount: number }) {
    return <div className="text-sm mb-2 tracking-tight font-light">{convertToCurrency(amount)}</div>
}