import { IApplicant } from "../models/IApplicant";
import { applicants } from '../database/Database'
import { IWallet } from "../models/types/IWallet";

class ApplicantRepository {
    create(data: IApplicant) {
        applicants[data.wallet] = data;
        return data;
    }

    find(wallet: IWallet) {
        return applicants[wallet];
    }

    list() {
        return Object.values(applicants)
    }

    listByIds(wallets: IWallet[]) {
        return wallets.map(wallet => this.find(wallet));
    }

    update(wallet: IWallet, data: IApplicant) {
        return applicants[wallet] = data;
    }

    delete(wallet: IWallet) {
        delete applicants[wallet];
    }
}

export const applicantRepository = new ApplicantRepository();