import { IApplicant, IApplicantChallengeAttempt, IApplicantCreate, IApplicantEdition } from "../models/IApplicant";
import { IApplication } from "../models/IApplication";
import { IUuid } from "../models/types/IUuid";
import { IWallet } from "../models/types/IWallet";
import { applicantRepository } from "../repositories/ApplicantRepository";
import { applicationRepository } from "../repositories/ApplicationRepository";
import { challengeRepository } from "../repositories/ChallengeRepository";
import { rankingService } from "./RankingService";

class ApplicantService {
    create(data: IApplicantCreate) {
        const applicant: IApplicant = {
            ...data,
            applications_accepted_quantity: 0,
            applications_quantity: 0,
            attempts_quantity: 0,
            challenges: {},
            total_score: 0,
        }

        return applicantRepository.create(applicant)
    }

    updateByApplication(application: IApplication) {
        const applicant = applicantRepository.find(application.wallet);

        if(!applicant) {
            throw new Error('Applicant dont find');
        }

        let applicantChallange = applicant.challenges[application.challenge_id];
        const applicantChallengeAttempt: IApplicantChallengeAttempt = {
            application_id: application.id,
            attempt_number: application.attempt_number,
            score: application.score,
            passed: application.passed,
            date: application.attempt_date
        }


        let updateTotalScore = false;

        if(!applicantChallange) {
            applicant.applications_quantity += 1;
            
            const attempts: Record<IUuid, IApplicantChallengeAttempt> = {}
            attempts[applicantChallengeAttempt.application_id] = applicantChallengeAttempt;


            const challange = challengeRepository.find(application.challenge_id);

            if(!challange) {
                throw new Error('Challenge dont find');
            }

            if(application.passed) {
                updateTotalScore = true;
            }

            applicantChallange = {
                title: challange.title,
                attempts: attempts,
                attempts_quantity: 1,
                best_score: application.passed ? application.score : null,
                best_score_application_id: application.passed ? application.id : null,
                challenge_id: application.challenge_id,
                passed: application.passed,
            }
        } else {
            applicantChallange.attempts[applicantChallengeAttempt.application_id] = applicantChallengeAttempt;
            applicantChallange.attempts_quantity += 1;
            
            if(application.passed && (!applicantChallange.best_score || applicantChallange.best_score < application.score)) {
                if(!applicantChallange.best_score) {
                    applicant.applications_accepted_quantity += 1;
                }

                updateTotalScore = true;
                applicantChallange.best_score = application.score;
                applicantChallange.best_score_application_id = application.id;
            }

            if(!applicantChallange.passed) {
                applicantChallange.passed = application.passed;
            }
        }

        applicant.challenges[application.challenge_id] = applicantChallange;
        applicant.attempts_quantity += 1;


        if(updateTotalScore) {
            applicant.total_score = Object.values(applicant.challenges).reduce((pv: number, cv) => {
                return pv + (cv.best_score || 0)
            }, 0);
        }

        const result = this.update(application.wallet, applicant);

        rankingService.generate();

        return result;
    }


    update(wallet: IWallet, data: IApplicant) {
        return applicantRepository.update(wallet, data);
    }

    patch(id: IUuid, data: IApplicantEdition) {
        const applicant = this.find(id);
        if(!applicant) {
            return null;
        }

        const updateData: IApplicantEdition = {}

        if(data.nickname) {
            updateData.nickname = data.nickname;
        }

        if(data.image_link || data.image_link === null) {
            updateData.image_link = data.image_link;
        }


        return this.update(id, {
            ...applicant,
            ...updateData
        })
    }

    find(wallet: IWallet) {
        return applicantRepository.find(wallet);
    }

    findByApplicationId(applicationId: IUuid) {
        const application = applicationRepository.find(applicationId);
        if(!application) {
            return null;
        }

        return applicantRepository.find(application.wallet);
    }

    list() {
        return applicantRepository.list();
    }

    listByChallengeId(challengeId: IUuid) {
        const challenge = challengeRepository.find(challengeId);
        if(!challenge) {
            return [];
        }

        const applications = applicationRepository.listByIds(Object.keys(challenge.applications));

        const applicantsSetIds = new Set();
        applications.forEach(application => {
            applicantsSetIds.add(application.wallet);
        })

        return applicantRepository.listByIds([...applicantsSetIds] as string[]);

    }
}

export const applicantService = new ApplicantService();
