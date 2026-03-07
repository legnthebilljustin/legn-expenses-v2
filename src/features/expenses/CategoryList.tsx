import { Button, Skeleton } from "@heroui/react";

import { ClothingIcon } from "@/assets/expenses-icons";
import { convertToCurrency } from "@/utils/currency";
import SubtitleText from "@/components/SubtitleText";
import { SpendCategoryStat } from "@/schemas/CategoriesSchema";

interface Props {
    isLoaded: boolean;
    categories: SpendCategoryStat[];
}

export default function CategoryList({ isLoaded, categories }: Props) {
    return (
        <div className="grid grid-cols-1 gap-1 mb-6 md:grid-cols-5">
            {categories.map((item: SpendCategoryStat) => (
                <div key={item.id} className="flex justify-between items-center px-2 py-2 bg-gray-200/50 dark:bg-gray-700/40 rounded-md">
                    <div className="flex flex-start items-center gap-2 radius-large">
                        <Skeleton className="rounded-full w-8 h-8" isLoaded={isLoaded}>
                            <Button isIconOnly color="primary" radius="sm" size="sm" variant="flat">
                                <span className="text-xs"><ClothingIcon /></span>
                            </Button>
                        </Skeleton>
                        <div>
                            <Skeleton className="rounded" isLoaded={isLoaded}>
                                <div className="text-slate-500 font-bold text-small"
                                    style={{ color: item?.color }}
                                >{ item?.name }</div>
                                <SubtitleText text={`${item.totalTransactions} transactions`} />
                            </Skeleton>
                        </div>
                    </div>
                    <Skeleton className="w-20 h-4 rounded" isLoaded={isLoaded}>
                        <div className="text-sm font-normal">{ convertToCurrency(item.totalSpent) }</div>
                    </Skeleton>
                </div>
            ))}
        </div>
    );
}