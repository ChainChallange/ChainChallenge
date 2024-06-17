import { IApplicant } from "../models/IApplicant";
import { IApplication } from "../models/IApplication";
import { IChallenge } from "../models/IChallenge";
import { ICreator } from "../models/ICreator";
import { IParticipantRanking } from "../models/IParticipantRanking";
import { IUuid } from "../models/types/IUuid";
import { IWallet } from "../models/types/IWallet";

export type IDatabaseCreators = Record<IWallet, ICreator>;
export type IDatabaseApplicant = Record<IWallet, IApplicant>;

export type IDatabaseChallenges = Record<IUuid, IChallenge>;
export type IDatabaseApplications = Record<IUuid, IApplication>;

export type IDatabaseRanking = IParticipantRanking[];
