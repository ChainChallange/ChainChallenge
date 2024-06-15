import { IApplicantEdition } from "../models/IApplicant";

export function verifyApplicantUpdatePayload(data: any): IApplicantEdition {
    const updateInfo: IApplicantEdition = {};
  
    if(data.nickname && typeof data.nickname === 'string') {
      updateInfo.nickname = data.nickname;
    }
  
    if(data.image_link && typeof data.image_link === 'string') {
      updateInfo.image_link = data.image_link
    }
  
    return updateInfo;
}