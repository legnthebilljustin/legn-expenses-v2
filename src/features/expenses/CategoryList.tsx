import { cn, Listbox, ListboxItem } from "@heroui/react";

import { ClothingIcon, ElectronicsIcon, FoodIcon, TravelIcon, UtilityIcon } from "@/assets/expenses-icons";
import CurrencyText from "@/components/CurrencyText";

const categories = [
    { name: "Clothing", transactions: 82, amount: 21342.23, icon: <ClothingIcon />, color: "#6366F1" },
    { name: "Travel", transactions: 82, amount: 21342.23, icon: <TravelIcon />, color: "#22C55E" },
    { name: "Electronics", transactions: 82, amount: 21342.23, icon: <ElectronicsIcon />, color: "#A855F7" },
    { name: "Food", transactions: 82, amount: 21342.23, icon: <FoodIcon />, color: "#64748B" },
    { name: "Utilities", transactions: 82, amount: 21342.23, icon: <UtilityIcon />, color: "#d2d537ff" },
];

export default function CategoryList() {
    return (
        <Listbox
            aria-label="User Menu"
            className="p-0 gap-0 divide-y divide-default-300/50 border-none pointer-events-none py-4"
            selectionMode="none"
        >
            {categories.map((item, index) => (
                <ListboxItem key={index} showDivider
                    className="mt-2"
                    description={<CurrencyText amount={item.amount} />}
                    endContent={<ItemCounter number={item.transactions} />}
                    startContent={
                        <div className="flex items-center rounded-small justify-center w-10 h-10"
                            style={{
                                backgroundColor: `${item.color}1A`, // ~10% opacity
                                color: item.color,
                            }}
                        >
                            {item.icon}
                        </div>
                    }
                >
                    { item.name }
                </ListboxItem>
            ))}
        </Listbox>
    );
}

export const IconWrapper = ({children, className}: { children: any, className: string }) => (
    <div className={cn(className, "flex items-center rounded-small justify-center w-10 h-10")}>
        {children}
    </div>
);

export const ItemCounter = ({number}: { number: number }) => (
    <div className="flex items-center gap-1 text-default-600 font-medium">
        <span className="text-small">{number}</span>
    </div>
);