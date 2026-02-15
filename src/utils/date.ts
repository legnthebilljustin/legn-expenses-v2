import { DateValue } from "@heroui/react";

export const isACalendarDate = (value: DateValue) => {
    return (
        typeof value === "object" && value !== null &&
        typeof value.day === "number" &&
        typeof value.month === "number" &&
        typeof value.year === "number" &&
        typeof value.era === "string"
    );
};