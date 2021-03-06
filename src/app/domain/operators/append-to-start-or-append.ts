declare type Selector<T = any> = (value?: T) => any;

/**
 * Appends to start items which do not exist in the source list or update existing.
 */
export function appendToStartOrUpdate<T>(item: T, compareBy: Selector<T>, toEnd: boolean = false) {

    return (existing: Readonly<T[]>): T[] => {
        if (!item) {
            return existing as T[];
        }

        if (Array.isArray(existing)) {
            const existingIndex = existing.findIndex(compareBy);
            if (existingIndex >= 0) {
                existing[existingIndex] = item;
            } else {
                if (toEnd) {
                    existing.push(item);
                } else {
                    existing.unshift(item);
                }
            }
            return [...existing];
        }
    };
}
