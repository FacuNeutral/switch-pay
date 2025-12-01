/**
 * Formats an object's properties into a single string using uppercase snake_case keys.
 * Processes metadata and headers objects separately, then combines the results.
 * 
 * @param metadata - The primary metadata object whose properties will be formatted.
 * @param headers - Additional headers metadata that will be processed separately.
 * @param excludeKeys - Array of property names to exclude from formatting (e.g., ["context", "tokenId"]).
 * 
 * @returns A formatted string containing all object properties processed separately then combined in the format:
 *          "KEY1: value1 - KEY2: value2 - ...". 
 *          Returns an empty string if both objects are null, undefined, or have no properties.
 */
export function formatProps(
    metadata: Record<string, any> = {},
    headers: Record<string, any> = {},
    excludeKeys: string[] = []
): string {
    // Helper function to process a single object
    const processObject = (obj: Record<string, any>): string[] => {
        if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
            return [];
        }

        return Object.entries(obj)
            .filter(([key, value]) => value !== undefined && !excludeKeys.includes(key))
            .map(([key, value]) => {
                const formattedKey = key
                    .replace(/([a-z])([A-Z])/g, '$1_$2')
                    .toUpperCase();
                return `${formattedKey}: ${value}`;
            });
    };

    // Process each object separately
    const metadataParts = processObject(metadata);
    const headersParts = processObject(headers);

    // Combine the results
    const allParts = [...headersParts, ...metadataParts];

    return allParts.length > 0 ? `[${allParts.join(' - ')}]` : '';
}
