import { IWallet } from "../models/types/IWallet";
import { App } from '@deroll/core'
import { encodingUtils } from "../utils/EncodingUtils";
import { verifyChallengeUpdatePayload } from "../verifiers/ChallengeUpdateVerifier";
import { challengeService } from "../services/ChallengeService";

export default function challengeUpdateController(app: App, payload: {method: 'challenge_update', data: any}, msgSender: IWallet): "accept" {
    app.createReport(encodingUtils.encodingToBlockchain(payload));
    
    payload.data = verifyChallengeUpdatePayload(payload.data);
    
    app.createReport(encodingUtils.encodingToBlockchain(payload.data))
    
    const result = challengeService.patch(msgSender, payload.data)
    
    app.createNotice(encodingUtils.encodingToBlockchain(result));
    
    return "accept";
}