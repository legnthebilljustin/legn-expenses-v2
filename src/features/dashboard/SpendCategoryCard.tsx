
import { Card, CardBody } from "@heroui/card";

import Donut from "@/components/Donut";
import { convertToCurrency } from "@/utils/currency";
export const data = [
    { label: "Shopping", value: 35, color: "#2563eb" },
    { label: "Home", value: 25, color: "#10b981" },
    { label: "Food & Drink", value: 15, color: "#f97316" },
    { label: "Trips", value: 15, color: "#9333ea" },
    { label: "Transport", value: 10, color: "#fbbf24" },
];
export default function SpendCategoryCard() {
    return (
        <Card className="max-w-md p-3 border-none" radius="lg">
            <CardBody className="flex flex-col items-center">
                <Donut centerTextData={convertToCurrency(12250)} 
                    data={data} 
                    showCenterText={true} 
                    subtitle="Spend by Category"
                /> 
            </CardBody>
        </Card>
    );
}