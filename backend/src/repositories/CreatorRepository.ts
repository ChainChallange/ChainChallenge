import { ICreator } from "../models/ICreator";
import { creators } from '../database/Database'
import { IWallet } from "../models/types/IWallet";

class CreatorRepository {
    create(data: ICreator) {
        creators[data.wallet] = data;
        return data;
    }

    find(wallet: IWallet) {
        return creators[wallet];
    }

    list() {
        return Object.values(creators)
    }

    listByIds(wallets: IWallet[]) {
        return wallets.map(wallet => this.find(wallet));
    }

    update(wallet: IWallet, data: ICreator) {
        return creators[wallet] = data;
    }

    delete(wallet: IWallet) {
        delete creators[wallet];
    }
}

export const creatorRepository = new CreatorRepository();