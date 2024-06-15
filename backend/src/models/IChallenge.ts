import { ILanguage } from "./types/ILanguage";
import { ISourceCode } from "./types/ISourceCode";
import { IUuid } from "./types/IUuid";
import { IWallet } from "./types/IWallet";

export interface IChallenge {
    id: IUuid;
    wallet_of_creator: IWallet;

    title: string;
    description: string;

    image_link: string | null;

    category: string | null;
    difficulty: string | null;
    
    creation_date: Date;
    start_date: Date;
    end_date: Date | null;

    max_applications_attempts: number | null;
    max_applications: number | null;
    wallet_of_applicants_only: IWallet[] | null;
    supported_languages: ILanguage[];
    min_passed_tests_to_complete: number;

    source_code_languages: ILanguageSourceCodeObj;
    attempt_template_source_code_languages: ILanguageSourceCodeObj;

    quantity_of_tests: number;
    tests: ILanguageTestsObj;

    quantity_of_applications: number;
    quantity_of_applications_accepted: number;
    quantity_of_applications_rejected: number;
    
    applications: Record<IUuid, IChallengeApplication>;
    applications_accepted_ranking: IChallengeApplication[];
}


export interface IChallengeEdition {
    title?: string;
    description?: string;
    
    image_link?: string;
}

export type ILanguageSourceCodeObj = {
    [key in ILanguage]?: ISourceCode
}

export type ILanguageTestsObj = {
    [key in ILanguage]?: Record<IUuid, ITestLanguage>
};

export interface ITestLanguage  {
    id: IUuid;
    title: string;
    code: ISourceCode;
}

export interface IChallengeApplication {
    id: IUuid;
    wallet: IWallet;
    passed: boolean;
    score: number;
    attempt_number: number;
    date: Date;
}

export type IChallengeCreate = {
    wallet_of_creator: IWallet;

    title: string;
    description: string;
    image_link?: string;

    category?: string;
    difficulty?: string;
    
    start_date?: Date;
    end_date?: Date | null;

    max_applications_attempts?: number | null;
    max_applications?: number | null;
    wallet_of_applicants_only?: IWallet[] | null;
    supported_languages: ILanguage[];
    min_passed_tests_to_complete?: number;

    source_code_languages: ILanguageSourceCodeObj;
    attempt_template_source_code_languages: ILanguageSourceCodeObj;

    tests: ILanguageTestsObj;
}

export type IChallengeCreateAndRunTests = {
    wallet: IWallet;

    title: string;
    description: string;

    category?: string;
    difficulty?: string;
    
    startDate?: Date;
    endDate?: Date | null;

    maxApplicationsAttempts?: number | null;
    maxApplications?: number | null;
    walletApplicantsOnly?: IWallet[] | null;
    supportedLanguages: ILanguage[];
    minPassedTestsToComplete?: number;

    sourceCodeLanguages: ILanguageSourceCodeObj;
    attemptTemplateSourceCodeLanguages: ILanguageSourceCodeObj;
}

export type IChallengeCreatePayload = {
    title: string;
    description: string;

    category?: string;
    difficulty?: string;
    
    startDate?: Date;
    endDate?: Date | null;

    maxApplicationsAttempts?: number | null;
    maxApplications?: number | null;
    walletApplicantsOnly?: IWallet[] | null;
    supportedLanguages: ILanguage[];
    minPassedTestsToComplete?: number;

    sourceCodeLanguages: ILanguageSourceCodeObj;
    attemptTemplateSourceCodeLanguages: ILanguageSourceCodeObj;
}