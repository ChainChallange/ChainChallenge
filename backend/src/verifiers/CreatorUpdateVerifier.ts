import { ICreatorEdition } from "../models/ICreator";

export function verifyCreatorUpdatePayload(data: any): ICreatorEdition {
    const updateInfo: ICreatorEdition = {};
  
    if(data.nickname === null || (data.nickname && typeof data.nickname === 'string')) {
      updateInfo.nickname = data.nickname;
    }
  
    if(data.image_link === null || (data.image_link && typeof data.image_link === 'string')) {
      updateInfo.image_link = data.image_link
    }
  
    return updateInfo;
}