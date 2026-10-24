import icon from './icon.webp';
import banner from './hero.webp';
import {Utility, UtilityGroupKey} from "../types";

export const Utility_PhotoCraft: Utility = {
    id: 'photo-craft',
    name: 'PhotoCraft',
    groupKey: UtilityGroupKey.ArtCraft,
    path: '/photo-craft',
    summary: 'Layered photo editor',
    iconSrc: icon.src,
    bannerSrc: banner.src,
}