import { IWallet } from "../models/types/IWallet";
import { App } from '@deroll/core'
import { encodingUtils } from "../utils/EncodingUtils";
import { applicationExecutionService } from "../services/ApplicationExecutionService";
import verifyApplicationCreatePayload from "../verifiers/ApplicationCreateVerifier";

export default function applicationCreateController(app: App, payload: {method: 'challenge', data: any}, msgSender: IWallet): "accept" {
    app.createReport(encodingUtils.encodingToBlockchain(payload));
    
    payload.data = verifyApplicationCreatePayload(payload.data);
    
    app.createReport(encodingUtils.encodingToBlockchain(payload.data))
    

    const result = applicationExecutionService.runChallengeAttemptAndSave(
        msgSender,
        payload.data.challengeId,
        payload.data.language,
        payload.data.sourceCode
    )
    
    app.createNotice(encodingUtils.encodingToBlockchain(result));
    
    return "accept";
}