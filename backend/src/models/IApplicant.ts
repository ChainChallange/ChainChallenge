import { IUuid } from "./types/IUuid";
import { IWallet } from "./types/IWallet";

export interface IApplicant {
    wallet: IWallet;
    
    image_link?: string;
    nickname?: string;

    applications_quantity: number;
    attempts_quantity: number;
    applications_accepted_quantity: number;
    total_score: number;
    challenges: Record<IUuid, IApplicantChallenge>
};

export interface IApplicantEdition {
    image_link?: string;
    nickname?: string;
}

export interface IApplicantChallenge {
    challenge_id: IUuid;
    title: string;
    attempts_quantity: number;
    passed: boolean;
    best_score: number | null;
    best_score_application_id: IUuid | null;
    attempts: Record<IUuid, IApplicantChallengeAttempt>
}

export interface IApplicantChallengeAttempt {
    application_id: IUuid;
    score: number;
    passed: boolean;
    attempt_number: number;
    date: Date;
}


export interface IApplicantCreate {
    wallet: IWallet;
}