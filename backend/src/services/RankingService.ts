import { IApplicant } from "../models/IApplicant";
import { IParticipantRanking, IParticipantRankingCreate } from "../models/IParticipantRanking";
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
            return this.applicantToParticipantRanking(applicant, 0);
        })

        return rankingRepository.createAndOrder(applicants);
    }

    updateByApplicant(applicant: IApplicant) {
        const ranking = this.findByWallet(applicant.wallet);
        if(!ranking) {
            return null;
        }

        rankingRepository.update(applicant.wallet, this.applicantToParticipantRanking(applicant, ranking.position))
    }

    private applicantToParticipantRanking(applicant: IApplicant, position: number): IParticipantRanking {
        return {
            applications_accepted_quantity: applicant.applications_accepted_quantity,
            attempts_quantity: applicant.attempts_quantity,
            challenges_quantity: Object.values(applicant.challenges).length,
            score: applicant.total_score,
            wallet: applicant.wallet,
            image_link: applicant.image_link,
            nickname: applicant.nickname,
            position
        }
    }

}

export const rankingService = new RankingService();