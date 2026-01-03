export function convertToCurrency(amount: number):string {
    if (typeof amount !== "number") {
        return "??";
    }

    return `\u20B1 ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}  `;
}