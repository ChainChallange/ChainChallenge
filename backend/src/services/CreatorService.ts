import { IApplication } from "../models/IApplication";
import { IChallenge } from "../models/IChallenge";
import { ICreator, ICreatorCreate, ICreatorEdition } from "../models/ICreator";
import { IUuid } from "../models/types/IUuid";
import { IWallet } from "../models/types/IWallet";
import { applicationRepository } from "../repositories/ApplicationRepository";
import { challengeRepository } from "../repositories/ChallengeRepository";
import { creatorRepository } from "../repositories/CreatorRepository";

class CreatorService {
    create(data: ICreatorCreate) {
        const creator: ICreator = {
            ...data,

            image_link: null,
            nickname: null,
            
            applications_accepted_quantity: 0,
            applications_quantity: 0,
            attempts_quantity: 0,
            challenges: {},
            challenges_quantity: 0,
        }

        return creatorRepository.create(creator)
    }

    updateByChallengeCreation(challenge: IChallenge) {
        const creator = creatorRepository.find(challenge.wallet_of_creator);

        if(!creator) {
            throw new Error('Creator dont found');
        }
        
        creator.challenges_quantity += 1;
        creator.challenges[challenge.id] = {
            challenge_id: challenge.id,
            title: challenge.title,
            attempts_quantity: 0,
            applications_quantity: 0,
            best_score: {
                score: null,
                wallet: null,
            },
        }

        this.update(creator.wallet, creator);
    }

    updateByApplication(application: IApplication) {
        const challenge = challengeRepository.find(application.challenge_id);

        if(!challenge) {
            throw new Error('Challenge dont found');
        }

        const creator = creatorRepository.find(challenge.wallet_of_creator);

        if(!creator) {
            throw new Error('Creator dont found');
        }

        if(application.passed) {
            creator.applications_accepted_quantity += 1;
        }

        let applicationsQuantitySum = 0;
        if(Object.values(challenge.applications).filter(app => app.wallet == application.wallet).length == 1) {
            applicationsQuantitySum = 1;
        }

        const creatorChallenge = creator.challenges[challenge.id];
        creatorChallenge.applications_quantity += applicationsQuantitySum;
        creatorChallenge.attempts_quantity += 1;

        if(application.passed && (!creatorChallenge.best_score.score || application.score > creatorChallenge.best_score.score)) {
            creatorChallenge.best_score = {
                score: application.score,
                wallet: application.wallet
            };
        }
        
        creator.challenges[challenge.id] = creatorChallenge;
        creator.applications_quantity += applicationsQuantitySum;
        creator.attempts_quantity += 1;

        this.update(creator.wallet, creator);
    }

    update(wallet: IWallet, data: ICreator) {
        return creatorRepository.update(wallet, data);
    }

    patch(id: IUuid, data: ICreatorEdition) {
        const creator = this.find(id);
        if(!creator) {
            return null;
        }

        return this.update(id, {
            ...creator,
            ...data
        })
    }

    find(wallet: IWallet) {
        return creatorRepository.find(wallet);
    }

    findByApplicationId(applicationId: IUuid) {
        const application = applicationRepository.find(applicationId);

        if(!application) {
            return null;
        }

        return this.findByChallengeId(application.challenge_id);
    }

    findByChallengeId(challengeId: IUuid) {
        const challenge = challengeRepository.find(challengeId);
        
        if(!challenge) {
            return null;
        }

        return this.find(challenge.wallet_of_creator);
    }

    list() {
        return creatorRepository.list();
    }
}

export const creatorService = new CreatorService();