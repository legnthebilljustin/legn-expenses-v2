
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
                {isLoading ? <Spinner size="lg" color="primary" /> 
                    : categoryStats.length > 0 ? (
                        <Donut centerTextData={convertToCurrency(totalSpent)} 
                            data={categoryStats} 
                            showCenterText={true} 
                            subtitle="Spend by Category"
                        /> 
                    ) : <div className="text-sm text-center text-gray-500">No data available</div>

                }
                
            </CardBody>
        </Card>
    );
}