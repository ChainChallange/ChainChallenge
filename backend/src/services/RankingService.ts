import { applicantRepository } from "../repositories/ApplicantRepository";
import { rankingRepository } from "../repositories/RankingRepository";

class RankingService {
    list() {
        return rankingRepository.list();
    }

    generate() {
        const applicants = applicantRepository.list().map(applicant => {
            return {    
                applications_accepted_quantity: applicant.applications_accepted_quantity,
                attempts_quantity: applicant.attempts_quantity,
                challenges_quantity: Object.values(applicant.challenges).length,
                score: applicant.total_score,
                wallet: applicant.wallet
            }
        })

        return rankingRepository.createAndOrder(applicants);
    }
}

export const rankingService = new RankingService();