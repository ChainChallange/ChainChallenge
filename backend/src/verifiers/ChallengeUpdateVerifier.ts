import { IChallengeEdition } from "../models/IChallenge";

export function verifyChallengeUpdatePayload(data: any): IChallengeEdition {
    const updateInfo: IChallengeEdition = {};
    if(data.title && typeof data.title === 'string') {
      updateInfo.title = data.title;
    }
  
    if(data.description && typeof data.description === 'string') {
      updateInfo.description = data.description;
    }
  
    if(data.image_link && typeof data.image_link === 'string') {
      updateInfo.image_link = data.image_link
    }
  
    return updateInfo;
}