import {Utility, UtilityGroup, UtilityGroupKey} from "./types";
import {Utility_PhotoCraft} from "@/lib/utility/photo-craft";
import {Utility_LightCraft} from "@/lib/utility/light-craft";
import {Utility_PDFCraft} from "@/lib/utility/pdf-craft";

export const allUtilities: Utility[] = [
    Utility_PhotoCraft,
    Utility_LightCraft,
    Utility_PDFCraft,
]

const utilityGroupTitleMap: { [K in UtilityGroupKey]: string } = {
    [UtilityGroupKey.ArtCraft]: 'ArtCraft',
}

export function utilitiesByGroup(): UtilityGroup[] {
    const groups = new Map<UtilityGroupKey, Utility[]>();
    for (const item of allUtilities) {
        const rows = groups.get(item.groupKey) ?? [];
        rows.push(item);
        groups.set(item.groupKey, rows);
    }

    return Array.from(groups.entries().map(entry => ({
        key: entry[0],
        title: utilityGroupTitleMap[entry[0]],
        utilities: entry[1]
    })));
}

export function utilityById(id: string) {
    return allUtilities.find((item) => item.id === id);
}

