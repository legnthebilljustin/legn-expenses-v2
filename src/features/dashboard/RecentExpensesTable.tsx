import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

import { DeleteIcon, EditIcon } from "@/assets/icons";
import { convertToCurrency } from "@/utils/currency";


export const columns = [
    {name: "ITEM", uid: "item"},
    {name: "PAYMENT", uid: "payment"},
    {name: "CATEGORY", uid: "category"},
    {name: "AMOUNT", uid: "amount"},
    {name: "ACTIONS", uid: "actions"},
];

export const expenses = [
    {
        id: 1,
        item: "Groceries",
        payment: "Credit Card",
        category: "Food",
        amount: 2450,
    },
    {
        id: 2,
        item: "Netflix Subscription",
        payment: "Debit Card",
        category: "Entertainment",
        amount: 549,
    },
    {
        id: 3,
        item: "Electricity Bill",
        payment: "Bank Transfer",
        category: "Utilities",
        amount: 3890,
    },
    {
        id: 4,
        item: "Grab Ride",
        payment: "E-Wallet",
        category: "Transport",
        amount: 320,
    },
    {
        id: 5,
        item: "Lunch – Ramen",
        payment: "Cash",
        category: "Food",
        amount: 480,
    },
    {
        id: 6,
        item: "Mobile Data Plan",
        payment: "Credit Card",
        category: "Utilities",
        amount: 999,
    },
    {
        id: 7,
        item: "Shopee Order",
        payment: "E-Wallet",
        category: "Shopping",
        amount: 1799,
    },
];
export default function RecentExpensesTable() {
    return (
        <Table aria-label="Recent expenses">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={expenses}>
                {(item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.payment}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-end">{convertToCurrency(item.amount)}</TableCell>
                        <TableCell className="flex justify-center gap-2">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

}