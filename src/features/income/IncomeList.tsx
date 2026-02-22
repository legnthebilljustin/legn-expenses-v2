import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

import { Income } from "@/schemas/IncomeSchema";
import { convertToCurrency } from "@/utils/currency";

export default function IncomeList({ incomeData }: { incomeData: any[] }) {
    return (
        <div className="text-center mt-12">
            <h2 className="text-xl font-bold">Your Income Transactions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <Table fullWidth isCompact className="mt-4"
                    style={{ minWidth: 300 }}
                >
                    <TableHeader>
                        <TableColumn key={1}>Source & Date</TableColumn>
                        <TableColumn key={3} align="end">Amount</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                        {incomeData.map((income: Income) => (
                            <TableRow key={income.id}>
                                <TableCell>
                                    <p className="text-bold capitalize">{income.source}</p>
                                    <p className="text-xs tracking-tight text-default-400">{income.receivedDate}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="font-thin text-end">{convertToCurrency(income.amount)}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div>
                    <div className="mt-16 text-sm text-slate-500">No data to display.</div>
                </div>
            </div>
            
        </div>
    );
}