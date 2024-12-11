/**
 * Returns the day as a string based on today's date or with an offset.
 * Wraps the day within the bounds of the current month, ensuring it does not exceed the number of days in the month.
 * @param {number} daysOffset - The number of days to move forward (positive) or backward (negative) from today.
 * @returns {string} The day of the month as a string, wrapped to fit within the current month's limits.
 */
export function getDayString(daysOffset = 0): string {
    const today = new Date();
    today.setDate(today.getDate() + daysOffset);

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const maxDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Calculate the wrapped day, ensuring it fits within the month's range
    const wrappedDay = ((today.getDate() - 1 + maxDaysInMonth) % maxDaysInMonth) + 1;

    return wrappedDay.toString();
}