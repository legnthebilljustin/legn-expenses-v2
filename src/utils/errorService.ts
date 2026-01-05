import { ZodError } from "zod";
import { AxiosError } from "axios";
export interface AppErrorType {
    code: number
    message: string
    errors: null | string | Record<string, string>
}

export default class AppError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code || 400;
    }

    toJSON() {
        return {
            message: this.message,
            code: this.code
        };
    }
}

export const AppErrorHandler = (error: unknown): AppErrorType => {
    if (error instanceof ZodError) {
        return {
            code: 400,
            message: "Data validation failed.",
            errors: null
        };
    }

    if (error instanceof AxiosError) {
        return {
            code: parseInt(error.code ?? "400"),
            message: error.response?.data.error,
            errors: error.response?.data.error
        };
    }

    return {
        code: 400,
        message: error instanceof Error ? error.message : "Something went wrong. Unable to complete request.",
        errors: null
    };
};