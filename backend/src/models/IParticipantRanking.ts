import { IWallet } from "./types/IWallet";

export interface IParticipantRanking {
    wallet: IWallet;
    image_link: string | null;
    nickname: string | null;
    score: number;
    position: number;
    attempts_quantity: number;
    applications_accepted_quantity: number;
    challenges_quantity: number;
}

export interface IParticipantRankingCreate {
    wallet: IWallet;
    image_link: string | null;
    nickname: string | null;
    score: number;
    attempts_quantity: number;
    applications_accepted_quantity: number;
    challenges_quantity: number;
}