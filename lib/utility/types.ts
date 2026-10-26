export type UtilityRelease = {
    repo: string;
    tag: string;
    assetPrefix: string;
    assetSuffix: string;
}

export type Utility = {
    id: string;
    name: string;
    path: string;
    groupKey: string;
    summary: string;
    iconSrc: string;
    bannerSrc: string;
    release?: UtilityRelease;
}

export type UtilityGroup = {
    key: string;
    title: string;
    utilities: Utility[];
}

export type UtilityCatalog = {
    groups: { key: string; title: string }[];
    utilities: Utility[];
}
