import catalog from "./utilities.json";
import {Utility, UtilityCatalog, UtilityGroup} from "./types";

const source = catalog as UtilityCatalog;

export const allUtilities: Utility[] = source.utilities;

export function utilitiesByGroup(): UtilityGroup[] {
    return source.groups.flatMap((group) => {
        const utilities = source.utilities.filter((item) => item.groupKey === group.key);
        if (utilities.length === 0) {
            return [];
        }
        return [{ key: group.key, title: group.title, utilities }];
    });
}

export function utilityById(id: string) {
    return allUtilities.find((item) => item.id === id);
}
