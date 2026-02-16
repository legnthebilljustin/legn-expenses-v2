import z from "zod";

import { FetchedPaymentMethod, FetchedPaymentMethodSchema } from "@/schemas/CardSchema";
import AppError from "@/utils/errorService";

export const validateFetchedPaymentMethod = (list: any[]): FetchedPaymentMethod[] => {
    const result = z.array(FetchedPaymentMethodSchema).safeParse(list);

    if (!result.success) {
        throw new AppError(400, "Fetched payment method format is not valid!");
    }

    return result.data;
};