import { IApplication, IApplicationCreate } from "../models/IApplication";
import { IChallenge } from "../models/IChallenge";
import { IUuid } from "../models/types/IUuid";
import { IWallet } from "../models/types/IWallet";
import { applicationRepository } from "../repositories/ApplicationRepository";
import { challengeRepository } from "../repositories/ChallengeRepository";
import { Uuid } from "../utils/Uuid";
import { applicantService } from "./ApplicantService";
import { challengeService } from "./ChallengeService";
import { creatorService } from "./CreatorService";

class ApplicationService {
    createAndUpdateChallengeApplicantAndCreator(data: IApplicationCreate) {
        const application = this.create(data);
        applicantService.updateByApplication(application);
        challengeService.updateByApplication(application);
        creatorService.updateByApplication(application);

        return application;
    }

    create(data: IApplicationCreate): IApplication {
        const date = new Date();
        
        const previousApplications = this.listByChallangeAndApplicant(data.challenge_id, data.wallet);
        const applicationNumber = previousApplications.length + 1; 

        const challange = challengeRepository.find(data.challenge_id);

        let passedTests = 0;
        let deniedTests = 0;

        Object.values(data.test_outputs).forEach(test => {
            if(test.result) {
                passedTests += 1;
            } else {
                deniedTests += 1;
            }
        })

        const application: IApplication = {
            ...data,
            id: Uuid(),

            tests_failed: deniedTests,
            tests_passed: passedTests,
            score: (passedTests / (passedTests + deniedTests)) * 100,
            attempt_number: applicationNumber,
            attempt_date: date,
            passed: challange.min_passed_tests_to_complete <= passedTests
        }

        this.verifyApplicationRules(application, challange);

        return applicationRepository.create(application)
    }


    listByChallangeAndApplicant(challengeId: IUuid, applicantWallet: IWallet): IApplication[] {
        const challenge = challengeRepository.find(challengeId);
        const applications = applicationRepository.listByIds(Object.keys(challenge.applications));

        const walletApplications = applications.filter(application => application.wallet === applicantWallet);
        return walletApplications;
    }

    verifyApplicationRules(application: IApplication, challenge: IChallenge) {
        if(challenge.start_date.getTime() - application.attempt_date.getTime() > 0) {
            throw new Error("Challenge doesn't started yet");
        }

        if(challenge.end_date && challenge.end_date.getTime() - application.attempt_date.getTime() < 0) {
            throw new Error('Challenge already ended');
        }
        
        if(challenge.max_applications_attempts && challenge.max_applications_attempts < application.attempt_number) {
            throw new Error('Maximum application attempts excided');
        }

        if(challenge.max_applications && challenge.max_applications <= challenge.quantity_of_applications_accepted) {
            throw new Error('Maximum application accepted');
        }

        if(challenge.wallet_of_applicants_only?.length && !challenge.wallet_of_applicants_only.includes(application.wallet)) {
            throw new Error("Wallet can't apply to this challenge")
        }
    }

    find(id: IUuid) {
        return applicationRepository.find(id)
    }

    list() {
        return applicationRepository.list()
    }
}

export const applicationService = new ApplicationService();