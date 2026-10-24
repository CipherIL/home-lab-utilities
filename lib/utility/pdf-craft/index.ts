import icon from './icon.webp';
import banner from './hero.webp';
import {Utility, UtilityGroupKey} from "../types";

export const Utility_PDFCraft: Utility = {
    id: 'pdf-craft',
    name: 'PDFCraft',
    groupKey: UtilityGroupKey.ArtCraft,
    path: '/pdf-craft',
    summary: 'Read, organize, and export PDFs',
    iconSrc: icon.src,
    bannerSrc: banner.src,
}