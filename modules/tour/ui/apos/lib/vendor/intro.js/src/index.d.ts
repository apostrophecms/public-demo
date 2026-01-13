import { Hint } from "./packages/hint";
import { Tour } from "./packages/tour";
declare class LegacyIntroJs extends Tour {
    /**
     * @deprecated introJs().addHints() is deprecated, please use introJs.hint().addHints() instead
     * @param args
     */
    addHints(..._: any[]): void;
    /**
     * @deprecated introJs().addHint() is deprecated, please use introJs.hint.addHint() instead
     * @param args
     */
    addHint(..._: any[]): void;
    /**
     * @deprecated introJs().removeHints() is deprecated, please use introJs.hint.hideHints() instead
     * @param args
     */
    removeHints(..._: any[]): void;
}
/**
 * Intro.js module
 */
declare const introJs: {
    (elementOrSelector?: string | HTMLElement): LegacyIntroJs;
    tour(elementOrSelector?: string | HTMLElement): Tour;
    hint(elementOrSelector?: string | HTMLElement): Hint;
    /**
     * Current Intro.js version
     */
    version: string;
};
export default introJs;
