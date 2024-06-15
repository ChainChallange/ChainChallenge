import { isNull } from "util";
import { IApplication } from "../models/IApplication";
import { IChallenge, IChallengeApplication, IChallengeCreate, IChallengeEdition } from "../models/IChallenge";
import { IUuid } from "../models/types/IUuid";
import { IWallet } from "../models/types/IWallet";
import { applicationRepository } from "../repositories/ApplicationRepository";
import { challengeRepository } from "../repositories/ChallengeRepository";
import { Uuid } from "../utils/Uuid";
import { creatorService } from "./CreatorService";

class ChallengeService {
    createAndUpdateCreator(data: IChallengeCreate) {
        const challenge = this.create(data);
        creatorService.updateByChallengeCreation(challenge);

        return challenge;
    }

    create(data: IChallengeCreate) {
        const id = Uuid();

        const creationDate = new Date();
        
        if(data.supported_languages.length < 1) {
            throw new Error('Invalid languages');
        }

        const testsQuantity = Object.values(Object.values(data.tests)[0]).length;

        const challenge: IChallenge = {
            ...data,
            id,

            category: data.category || null,
            difficulty: data.difficulty || null,
            image_link: data.image_link || null,
            
            end_date: data.end_date || null,
            max_applications: data.max_applications || null,
            max_applications_attempts: data.max_applications_attempts || null,
            min_passed_tests_to_complete: data.min_passed_tests_to_complete || testsQuantity,
            
            start_date: data.start_date || creationDate,
        
            wallet_of_applicants_only: data.wallet_of_applicants_only || [], 

            creation_date: creationDate,
            
            applications: {},
            applications_accepted_ranking: [],

            quantity_of_applications: 0,
            quantity_of_applications_accepted: 0,
            quantity_of_applications_rejected: 0,
            quantity_of_tests: testsQuantity,
        }

        return challengeRepository.create(challenge)
    }

    updateByApplication(application: IApplication) {
        const challenge = challengeRepository.find(application.challenge_id);

        if(!challenge) {
            throw new Error('Challenge dont found');
        }

        const challengeApplication: IChallengeApplication = {
            id: application.id,
            wallet: application.wallet,
            passed: application.passed,
            score: application.score,
            attempt_number: application.attempt_number,
            date: application.attempt_date,
        }

        challenge.applications[challengeApplication.id] = challengeApplication;

        if(application.passed) {
            const passedApplications = Object.values(challenge.applications).filter(app => app.passed);

            const bestApplicationsByWallet: { [wallet: string]: IChallengeApplication } = {};

            passedApplications.forEach(app => {
                if (!bestApplicationsByWallet[app.wallet] || app.score > bestApplicationsByWallet[app.wallet].score) {
                    bestApplicationsByWallet[app.wallet] = app;
                }
            });
            
            challenge.applications_accepted_ranking = Object.values(bestApplicationsByWallet)
                .sort((a, b) => b.score - a.score);
        }
        
        challenge.quantity_of_applications = challenge.quantity_of_applications + 1;

        challenge.quantity_of_applications_accepted += application.passed ? 1 : 0;
        challenge.quantity_of_applications_rejected += application.passed ? 0 : 1;


        return this.update(application.challenge_id, challenge);
    }

    patch(id: IUuid, data: IChallengeEdition) {
        const challenge = this.find(id);
        if(!challenge) {
            return null;
        }

        const updateData: IChallengeEdition = {}

        if(data.title) {
            updateData.title = data.title;
        }

        if(data.description) {
            updateData.description = data.description;
        }

        if(data.image_link || data.image_link === null) {
            updateData.image_link = data.image_link;
        }


        return this.update(id, {
            ...challenge,
            ...updateData
        })
    }

    update(id: IUuid, data: IChallenge) {
        return challengeRepository.update(id, data);
    }

    find(id: IUuid) {
        return challengeRepository.find(id)
    }

    findByApplication(applicationId: IUuid) {
        const application = applicationRepository.find(applicationId);

        if(!application) {
            return null;
        }

        return challengeRepository.find(application.challenge_id);
    }

    list() {
        return challengeRepository.list();
    }

    listByCreator(creatorWallet: IWallet) {
        return challengeRepository.list().filter(challenge => {
            return challenge.wallet_of_creator === creatorWallet;
        })
    }
}

export const challengeService = new ChallengeService();