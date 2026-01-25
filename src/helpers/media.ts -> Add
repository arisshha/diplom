import { PREFIX } from './API';

const PLACEHOLDER =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="240" viewBox="0 0 160 240" fill="none"><rect width="160" height="240" rx="8" fill="%23f2f2f2"/><path d="M80 60a26 26 0 1 1 0 52 26 26 0 0 1 0-52Zm0 12a14 14 0 1 0 0 28 14 14 0 0 0 0-28Zm-36 112c0-18.2 16.1-33 36-33s36 14.8 36 33v6H44v-6Z" fill="%23c7c7c7"/></svg>';

export const resolveMediaUrl = (src?: string | null): string => {
    if (!src) return PLACEHOLDER;
    if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;
    const normalized = src.startsWith('/') ? src : `/${src}`;
    return `${PREFIX}${normalized}`;
};

export const placeholderPoster = PLACEHOLDER;

