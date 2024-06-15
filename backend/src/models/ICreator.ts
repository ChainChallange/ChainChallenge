import { IUuid } from "./types/IUuid";
import { IWallet } from "./types/IWallet";

export interface ICreator {
    wallet: IWallet;

    nickname?: string;
    image_link?: string;

    challenges_quantity: number;
    applications_quantity: number;
    attempts_quantity: number;
    applications_accepted_quantity: number;
    challenges: Record<IUuid, ICreatorChallenge>;
}


export interface ICreatorEdition {
    nickname?: string;
    image_link?: string;
}

export interface ICreatorChallenge {
    challenge_id: string;
    title: string;
    attempts_quantity: number;
    applications_quantity: number;
    best_score: {
        score: number | null;
        wallet: IWallet | null;
    }
}

export interface ICreatorCreate {
    wallet: IWallet;
}