export const UtilityGroupKey = {
    ArtCraft: 'art-craft',
} as const;

export type UtilityGroupKey = typeof UtilityGroupKey[keyof typeof UtilityGroupKey];

export type Utility = {
    id: string;
    name: string;
    path: string;
    groupKey: UtilityGroupKey;
    summary: string;
    iconSrc: string;
    bannerSrc: string;
}

export type UtilityGroup = {
    key: UtilityGroupKey;
    title: string;
    utilities: Utility[];
}