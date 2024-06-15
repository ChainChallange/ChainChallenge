import { IWallet } from "../models/types/IWallet";
import { App } from '@deroll/core'
import { encodingUtils } from "../utils/EncodingUtils";
import verifyChallengeCreatePayload from "../verifiers/ChallengeCreateVerifier";
import { challengeExecutionService } from "../services/ChallengeExecutionService";

export function challengeCreateController(app: App, payload: {method: 'challenge', data: any}, msgSender: IWallet): "accept" {
    app.createReport(encodingUtils.encodingToBlockchain(payload))
  
    payload.data = verifyChallengeCreatePayload(payload.data);
  
    app.createReport(encodingUtils.encodingToBlockchain(payload.data))
  
    const result = challengeExecutionService.createChallengeAndGetTests({
      ...payload.data,
      wallet: msgSender
    })
  
    app.createNotice(encodingUtils.encodingToBlockchain(result))
  
    return "accept";
}