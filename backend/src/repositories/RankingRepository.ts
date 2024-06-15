import { IParticipantRanking, IParticipantRankingCreate } from "../models/IParticipantRanking";
import { ranking, sortRanking } from '../database/Database'
import { IWallet } from "../models/types/IWallet";

class RankingRepository {
    createAndOrder(participants:IParticipantRankingCreate[]) {
        ranking.length = 0;

        this.sortRanking(participants).forEach(participant => this.createAtEnd(participant));

        return ranking;
    }

    createAtEnd(data: IParticipantRankingCreate) {
        ranking.push({...data, position: ranking.length +1});
        return data;
    }

    find(wallet: IWallet): IParticipantRanking | null {
        const results = this.listByWallets([wallet]);
        return results[0] || null;
    }

    list() {
        return Object.values(ranking)
    }

    listByWallets(wallets: IWallet[]): IParticipantRanking[] {
        const participants: IParticipantRanking[] = [];

        for(let i =0; i < ranking.length; i++) {
            if(wallets.includes(ranking[i].wallet)) {
                participants.push(ranking[i]);

                if(participants.length === wallets.length) {
                    break;
                }
            }
        }

        return participants;
    }

    update(wallet: IWallet, data: IParticipantRanking) {
        const index = this.findIndex(wallet);

        if(!index) {
            return null;
        }

        return ranking[index] = data;
    }

    findIndex(wallet: IWallet) {
        for(let i =0; i< ranking.length; i++) {
            if(ranking[i].wallet === wallet) {
                return i;
            }
        }

        return null;
    }

    private sortRanking(participants: IParticipantRankingCreate[]): IParticipantRankingCreate[] {
        return participants.sort((a, b) => {
            if(b.score === a.score) {
                return a.attempts_quantity - b.attempts_quantity;
            }
    
            return b.score - a.score
        })
    }
}

export const rankingRepository = new RankingRepository();