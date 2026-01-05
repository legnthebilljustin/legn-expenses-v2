import * as z from "zod";
import { Timestamp } from "firebase/firestore/lite";

export const validateDateOrTimestamp = () => {
    return z.custom((value) => {
        return value instanceof Date || value instanceof Timestamp;
    }, { message: "Invalid date format. Must be a Date or Firestore Timestamp" });
};