import { IWallet } from "../models/types/IWallet";
import { App } from '@deroll/core'
import { encodingUtils } from "../utils/EncodingUtils";
import { verifyChallengeUpdatePayload } from "../verifiers/ChallengeUpdateVerifier";
import { challengeService } from "../services/ChallengeService";

export default function challengeUpdateController(app: App, payload: {method: 'challenge_update', data: any}, msgSender: IWallet): "accept" {
    app.createReport(encodingUtils.encodingToBlockchain(payload));
    
    const sanitazedInput = verifyChallengeUpdatePayload(payload.data, msgSender);
    
    app.createReport(encodingUtils.encodingToBlockchain(sanitazedInput.data))
    
    const result = challengeService.patch(sanitazedInput.id, sanitazedInput.data)
    
    app.createNotice(encodingUtils.encodingToBlockchain(result));
    
    return "accept";
}