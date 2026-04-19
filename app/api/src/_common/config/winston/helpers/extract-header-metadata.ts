import { asyncLocalStorage } from "@middlewares/request-context.middleware";

/**
 * Extracts metadata from the async local storage based on the provided key list.
 * This function retrieves values from the current request context and returns them
 * as a metadata object for logging purposes.
 * 
 * @param keyList - Required array of keys to extract from the async local storage.
 *                  This parameter is mandatory and must contain at least one key.
 * 
 * @returns A record object containing the extracted metadata key-value pairs.
 *          Only keys that exist in the store and have values will be included.
 * 
 * @example
 * ```typescript
 * // Extract specific metadata keys
 * const metadata = extractHeaderMetadata(["userId", "sessionId"]);
 * // Returns: { userId: "12345", sessionId: "abc-def-ghi" }
 * 
 * // Extract when some keys don't exist in store
 * const partialMetadata = extractHeaderMetadata(["userId", "nonExistentKey"]);
 * // Returns: { userId: "12345" } (only existing keys are included)
 * ```
 */
export const extractHeaderMetadata = (keyList: string[]): Record<string, any> => {

    const store = asyncLocalStorage.getStore();
    if (!store) return {}

    const metadata: Record<string, any> = {};

    keyList.forEach((key) => {
        const value = store.get(key);
        if (value) metadata[key] = value
    });

    return metadata;
}