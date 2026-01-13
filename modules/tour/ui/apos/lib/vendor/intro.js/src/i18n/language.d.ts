declare const languages: {
    readonly en_US: {
        buttons: {
            next: string;
            prev: string;
            skip: string;
            done: string;
            gotIt: string;
        };
        messages: {
            dontShowAgainLabel: string;
            stepNumbersOfLabel: string;
        };
    };
    readonly fa_IR: {
        buttons: {
            next: string;
            prev: string;
            skip: string;
            done: string;
            gotIt: string;
        };
        messages: {
            dontShowAgainLabel: string;
            stepNumbersOfLabel: string;
        };
    };
    readonly de_DE: {
        buttons: {
            next: string;
            prev: string;
            skip: string;
            done: string;
            gotIt: string;
        };
        messages: {
            dontShowAgainLabel: string;
            stepNumbersOfLabel: string;
        };
    };
    readonly es_ES: {
        buttons: {
            next: string;
            prev: string;
            skip: string;
            done: string;
            gotIt: string;
        };
        messages: {
            dontShowAgainLabel: string;
            stepNumbersOfLabel: string;
        };
    };
    readonly fr_FR: {
        buttons: {
            next: string;
            prev: string;
            skip: string;
            done: string;
            gotIt: string;
        };
        messages: {
            dontShowAgainLabel: string;
            stepNumbersOfLabel: string;
        };
    };
    readonly ar_SA: {
        buttons: {
            next: string;
            prev: string;
            skip: string;
            done: string;
            gotIt: string;
        };
        messages: {
            dontShowAgainLabel: string;
            stepNumbersOfLabel: string;
        };
    };
};
export type LanguageCode = keyof typeof languages;
export declare const DefaultLanguage: LanguageCode;
export declare function getAvailableLanguages(): LanguageCode[];
export declare class Translator {
    private _languageCode;
    constructor(languageCode?: LanguageCode);
    setLanguage(code: LanguageCode): void;
    getLanguage(): LanguageCode;
    private get messages();
    private getString;
    translate(message: string): string;
}
export {};
