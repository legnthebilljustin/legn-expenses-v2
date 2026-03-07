
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/react";

import Donut from "@/components/Donut";
import { convertToCurrency } from "@/utils/currency";
import { SpendCategoryStat } from "@/schemas/CategoriesSchema";

interface Props {
    categoryStats: SpendCategoryStat[]
    isLoading: boolean
    totalSpent: number
}
export default function SpendCategoryCard({ categoryStats, isLoading, totalSpent }: Props) {
    return (
        <Card className="max-w-md p-3 border-none" radius="lg">
            <CardBody className="flex flex-col items-center">
                {isLoading && <Spinner color="primary" size="lg" />}
                <Donut centerTextData={convertToCurrency(totalSpent)} 
                    data={categoryStats} 
                    showCenterText={true} 
                    subtitle="Spend by Category"
                /> 
            </CardBody>
        </Card>
    );
}