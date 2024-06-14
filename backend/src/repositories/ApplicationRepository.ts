import { IApplication } from "../models/IApplication";
import { applications } from '../database/Database'
import { IUuid } from "../models/types/IUuid";

class ApplicationRepository {
    create(data: IApplication) {
        applications[data.id] = data;
        return data;
    }

    find(id: IUuid): IApplication | null {
        return applications[id] || null;
    }

    list() {
        return Object.values(applications)
    }

    listByIds(ids: IUuid[]): IApplication[] {
        return ids.map(id => this.find(id)).filter(application => application) as IApplication[];
    }

    update(id: IUuid, data: IApplication) {
        return applications[id] = data;
    }

    delete(id: IUuid) {
        delete applications[id];
    }
}

export const applicationRepository = new ApplicationRepository();