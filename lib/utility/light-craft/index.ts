import icon from './icon.webp';
import banner from './hero.webp';
import {Utility, UtilityGroupKey} from "../types";

export const Utility_LightCraft: Utility = {
    id: 'light-craft',
    name: 'LightCraft',
    groupKey: UtilityGroupKey.ArtCraft,
    path: '/light-craft',
    summary: 'Photo library and RAW developer',
    iconSrc: icon.src,
    bannerSrc: banner.src,
}