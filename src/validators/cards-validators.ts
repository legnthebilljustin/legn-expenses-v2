import { FetchedPaymentMethod, FetchedPaymentMethodSchema } from "@/schemas/CardSchema";
import AppError from "@/utils/errorService";
import z from "zod";

export const validateFetchedPaymentMethod = (list: any[]): FetchedPaymentMethod[] => {
    const result = z.array(FetchedPaymentMethodSchema).safeParse(list);

    if (!result.success) {
        console.error("Validation error for fetched payment methods:", result.error);
        throw new AppError(400, "Fetched payment method format is not valid!");
    }

    return result.data;
}