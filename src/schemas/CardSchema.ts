import { z } from "zod";

export const PaymentMethodsSchema = z.object({
    name: z.string(),
    color: z.string(),
    billingDay: z.union([
        z.null(),
        z.number()
            .min(1, "Must be a number between 1-31.")
            .max(31, "Must be a number between 1-31."),
    ]),
    dueDaysAfterBilling: z.union([
        z.null(),
        z.number()
            .min(1, "Must be a number between 1-31.")
            .max(31, "Must be a number between 1-31."),
    ]),
    usageSummary: z.object({
        totalSpent: z.number(),
        transactionCount: z.number()
    })
});

export const FetchedPaymentMethodSchema = PaymentMethodsSchema.extend({
    id: z.string()
});

export type PaymentMethod = z.infer<typeof PaymentMethodsSchema>;
export type FetchedPaymentMethod = z.infer<typeof FetchedPaymentMethodSchema>;