import { ILanguage } from "./types/ILanguage";
import { ISourceCode } from "./types/ISourceCode";
import { IUuid } from "./types/IUuid";
import { IWallet } from "./types/IWallet";

export interface IApplication {
    id: IUuid;

    challenge_id: IUuid;

    wallet: IWallet;
    attempt_number: number;
    attempt_date: Date;
    
    language: ILanguage;
    source_code: ISourceCode;
    
    tests_passed: number;
    tests_failed: number;
    test_outputs: Record<IUuid, IApplicationTestOutput>

    passed: boolean;
    score: number;
}

export interface IApplicationTestOutput {
    test_id: IUuid;
    result: boolean;
    time_ms: number;
}

export interface IApplicationCreate {
    wallet: IWallet;

    challenge_id: IUuid;

    language: ILanguage;
    source_code: ISourceCode;
    
    test_outputs: Record<IUuid, IApplicationTestOutput>;
}