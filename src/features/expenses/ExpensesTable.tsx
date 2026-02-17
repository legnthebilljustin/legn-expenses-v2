import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

import { DeleteIcon, EditIcon } from "@/assets/icons";
import { convertToCurrency } from "@/utils/currency";
import { ExpenseItem } from "@/schemas/ExpenseSchema";

export const columns = [
    {name: "ITEM", uid: "item", width: "35%"},
    {name: "PAYMENT", uid: "payment", width: "15%"},
    {name: "CATEGORY", uid: "category", width: "15%"},
    {name: "AMOUNT", uid: "amount", width: "12%"},
    {name: "ACTIONS", uid: "actions", width: "10%"},
];

interface Props {
    purchaseDate: string
    expenses: ExpenseItem[]
}

export default function ExpensesTable({ purchaseDate, expenses }: Props) {
    const hexToRGBA = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, 0.2)`;
    };
    return (
        <>
            <div className="text-sm font-bold tracking-tight mb-2 mt-4 text-slate-400">{purchaseDate}</div>
            <Table aria-label="Expenses table">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={["amount", "actions"].includes(column.uid) ? "end" : "start"}
                            style={{ width: column.width }}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={expenses}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>
                                <Chip className="truncate" radius="lg"
                                    size="sm"
                                    style={{
                                        backgroundColor: hexToRGBA(item.paymentMethodDetails.color),
                                        color: item.paymentMethodDetails.color,
                                    }}
                                >
                                    <div className="w-[120px] truncate">
                                        { item.paymentMethodDetails.name }
                                    </div>
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Chip radius="lg" size="sm"
                                    style={{
                                        color: item.spendCategoryDetails.color
                                    }}
                                    variant="light"
                                >
                                    {item.spendCategoryDetails.name}
                                </Chip>
                            </TableCell>
                            <TableCell className="text-end">
                                <div className="font-thin">{convertToCurrency(item.price)}</div>
                            </TableCell>
                            <TableCell className="text-end">
                                <div className="flex justify-center gap-2">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon />
                                    </span>
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon />
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );

}