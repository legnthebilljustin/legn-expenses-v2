import z from "zod";

export const IncomeSchema = z.object({
    id: z.string(),
    source: z.string().min(1, "Source is required"),
    amount: z.number().positive("Amount must be greater than 0"),
    receivedDate: z.string().min(1, "Received date is required"),
    notes: z.string().optional(),
});

export const CreateIncomeSchema = IncomeSchema.omit({ id: true }).extend({
    receivedDate: z.string().refine(dateStr => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
    }, "Invalid date format. Expected YYYY-MM-DD")
});

export type Income = z.infer<typeof IncomeSchema>;