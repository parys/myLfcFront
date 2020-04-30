declare type Selector<T = any> = (value?: T) => any;

/**
 * Appends to start items which do not exist in the source list or update existing.
 */
export function appendToStartOrUpdate<T>(item: T, compareBy: Selector<T>) {

    return (existing: Readonly<T[]>): T[] => {
        let result: T[];
        if (!item) {
            return existing as T[];
        }

        if (Array.isArray(existing)) {
            const existingIndex = existing.findIndex(compareBy);
            if (existingIndex >= 0) {
                existing[existingIndex] = item;
                result = existing;
            } else {
                result = [item, ...existing];
            }
            return result;
        };
    }
}
