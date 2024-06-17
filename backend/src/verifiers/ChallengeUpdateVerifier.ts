import { IChallengeEdition } from "../models/IChallenge";
import { IUuid } from "../models/types/IUuid";
import { IWallet } from "../models/types/IWallet";
import { challengeService } from "../services/ChallengeService";

export function verifyChallengeUpdatePayload(data: any, msgSender: IWallet): {data: IChallengeEdition, id: IUuid} {
    const updateInfo: IChallengeEdition = {};

    let id = null;

    if(data.id && typeof data.id == 'string') {
      const challenge = challengeService.find(data.id);
      if(!challenge) {
        throw new Error('Challenge doent exist');
      } else if(challenge.wallet_of_creator != msgSender){
        throw new Error('Must be the challenge creator to edit')
      } else  {
        id = data.id;
      }
    } else {
      throw new Error('challengeId is a mandatory field')
    }

    if(data.title && typeof data.title === 'string') {
      updateInfo.title = data.title;
    }
  
    if(data.description && typeof data.description === 'string') {
      updateInfo.description = data.description;
    }
  
    if(data.image_link === null || (data.image_link && typeof data.image_link === 'string')) {
      updateInfo.image_link = data.image_link
    }

    if(data.category === null || (data.category && typeof data.category === 'string')) {
      updateInfo.category = data.category
    }

    if(data.difficulty === null || (data.difficulty && typeof data.difficulty === 'string')) {
      updateInfo.difficulty = data.difficulty
    }
  
    return {data: updateInfo, id};
}