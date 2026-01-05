import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

import { columns, expenses } from "../dashboard/RecentExpensesTable";

import { DeleteIcon, EditIcon } from "@/assets/icons";
import { convertToCurrency } from "@/utils/currency";

export default function ExpensesTable() {
    return (
        <>
            <div className="text-sm font-bold tracking-tight mb-2 mt-4 text-slate-400">Thu, January 01 2026</div>
            <Table aria-label="Expenses table">
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
        </>
    );

}