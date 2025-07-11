/**
 * Generates a random numeric code of the specified number of digits.
 * Each digit can appear at most twice in the generated code.
 *
 * @param digits - The length of the code to generate (must be between 2 and 10). Defaults to 6.
 * @returns A string representing the random code.
 * @throws Error if the digits parameter is not between 2 and 10.
 * @author Facundo Alvarez | GitHub - FacuNeutral
 */
export const createRandomNumericCode = (digits: number = 6): string => {
    if (digits < 2 || digits > 10) {
        throw new Error('digits must be between 2 and 10');
    }
    while (true) {
        const max = Math.pow(10, digits);
        const code = Math.floor(Math.random() * max).toString().padStart(digits, '0');
        const counts = Array(10).fill(0);
        for (const digit of code) {
            counts[parseInt(digit)]++;
            if (counts[parseInt(digit)] > 2) {
                break;
            }
        }
        if (counts.every(count => count <= 2)) {
            return code;
        }
    }
};

export const createRandomCode = (length: number = 6): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}