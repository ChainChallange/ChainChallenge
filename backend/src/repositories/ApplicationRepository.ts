import { IApplication } from "../models/IApplication";
import { applications } from '../database/Database'
import { IUuid } from "../models/types/IUuid";

class ApplicationRepository {
    create(data: IApplication) {
        applications[data.id] = data;
        return data;
    }

    find(id: IUuid) {
        return applications[id];
    }

    list() {
        return Object.values(applications)
    }

    listByIds(ids: IUuid[]) {
        return ids.map(id => this.find(id));
    }

    update(id: IUuid, data: IApplication) {
        return applications[id] = data;
    }

    delete(id: IUuid) {
        delete applications[id];
    }
}

export const applicationRepository = new ApplicationRepository();