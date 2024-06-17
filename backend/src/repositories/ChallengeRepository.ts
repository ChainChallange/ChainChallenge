import { IChallenge } from "../models/IChallenge";
import { challenges } from '../database/Database'
import { IUuid } from "../models/types/IUuid";

class ChallengeRepository {
    create(data: IChallenge) {
        challenges[data.id] = data;
        return data;
    }

    find(id: IUuid): IChallenge | null {
        return challenges[id] || null;
    }

    list() {
        return Object.values(challenges)
    }

    listByIds(ids: IUuid[]) {
        return ids.map(id => this.find(id));
    }

    update(id: IUuid, data: IChallenge) {
        challenges[id] = data;
        return data;
    }

    delete(id: IUuid) {
        delete challenges[id];
    }
}

export const challengeRepository = new ChallengeRepository();