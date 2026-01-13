import { TooltipPosition } from "../../packages/tooltip";
import { HintItem, HintPosition } from "./hintItem";
import { Translator, LanguageCode } from "../../i18n/language";
export interface HintOptions {
    hints: Partial<HintItem>[];
    isActive: boolean;
    tooltipPosition: string;
    tooltipClass: string;
    hintPosition: HintPosition;
    hintButtonLabel: string;
    hintShowButton: boolean;
    hintAutoRefreshInterval: number;
    hintAnimation: boolean;
    buttonClass: string;
    helperElementPadding: number;
    autoPosition: boolean;
    positionPrecedence: TooltipPosition[];
    tooltipRenderAsHtml?: boolean;
    language?: LanguageCode;
}
export declare function getDefaultHintOptions(translator?: Translator): HintOptions;
