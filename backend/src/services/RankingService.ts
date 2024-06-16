import { IParticipantRankingCreate } from "../models/IParticipantRanking";
import { IWallet } from "../models/types/IWallet";
import { applicantRepository } from "../repositories/ApplicantRepository";
import { rankingRepository } from "../repositories/RankingRepository";

class RankingService {
    list() {
        return rankingRepository.list();
    }

    findByWallet(wallet: IWallet) {
        return this.list().find(applicant => applicant.wallet === wallet) || null;
    }

    generate() {
        const applicants: IParticipantRankingCreate[] = applicantRepository.list().map(applicant => {
            return {    
                applications_accepted_quantity: applicant.applications_accepted_quantity,
                attempts_quantity: applicant.attempts_quantity,
                challenges_quantity: Object.values(applicant.challenges).length,
                score: applicant.total_score,
                wallet: applicant.wallet,
                image_link: applicant.image_link,
                nickname: applicant.nickname   
            }
        })

        return rankingRepository.createAndOrder(applicants);
    }
}

export const rankingService = new RankingService();