/** Generates an age in milliseconds based on the provided days string.
* The string should be in the format '123D', where '123' is the number of days.
* @param {string} days - The number of days in the format '123D'.
* @throws {Error} If the input string is not in the correct format.
* @return {number} The age in milliseconds.
*/
export const parseDaysToMaxAge = (days = "123d") => {
    const regex = /^\d+d$/;

    if (!regex.test(days))
        throw new Error("Invalid days format. Use '1d', '2d', etc.");

    const daysCount = parseInt(days.slice(0, -1), 10);

    return daysCount * 24 * 60 * 60 * 1000;
};

export const parseMinutesToMaxAge = (minutes = "123m") => {
    const regex = /^\d+m$/;

    if (!regex.test(minutes))
        throw new Error("Invalid minutes format. Use '1m', '2m', etc.");

    const minutesCount = parseInt(minutes.slice(0, -1), 10);

    return minutesCount * 60 * 1000;
}