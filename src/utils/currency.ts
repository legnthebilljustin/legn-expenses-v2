export function convertToCurrency(amount: number):string {
    if (typeof amount !== "number") {
        return "??"
    }

    return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} \u20B1 `;
}