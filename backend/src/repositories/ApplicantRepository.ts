import { IApplicant } from "../models/IApplicant";
import { applicants } from '../database/Database'
import { IWallet } from "../models/types/IWallet";

class ApplicantRepository {
    create(data: IApplicant) {
        applicants[data.wallet] = data;
        return data;
    }

    find(wallet: IWallet): IApplicant | null {
        return applicants[wallet] || null;
    }

    list() {
        return Object.values(applicants)
    }

    listByIds(wallets: IWallet[]): IApplicant[]{
        return wallets.map(wallet => this.find(wallet)).filter(applicant => applicant) as IApplicant[];
    }

    update(wallet: IWallet, data: IApplicant) {
        return applicants[wallet] = data;
    }

    delete(wallet: IWallet) {
        delete applicants[wallet];
    }
}

export const applicantRepository = new ApplicantRepository();