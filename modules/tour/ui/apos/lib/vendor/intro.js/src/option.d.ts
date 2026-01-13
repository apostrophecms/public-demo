import { TourOptions } from "./packages/tour/option";
import { HintOptions } from "./packages/hint/option";
export declare function applyLanguageDefaults<T extends TourOptions | HintOptions>(options: T): T;
/**
 * Update a single option.
 * Special handling for language: regenerates defaults in the new language.
 */
export declare function setOption<T extends TourOptions | HintOptions, K extends keyof T>(options: T, key: K, value: T[K]): T;
/**
 * Update multiple options at once.
 */
export declare function setOptions<T extends TourOptions | HintOptions>(options: T, partialOptions: Partial<T>): T;
