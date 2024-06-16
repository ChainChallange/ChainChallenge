import { IWallet } from "../models/types/IWallet";
import { App } from '@deroll/core'
import { encodingUtils } from "../utils/EncodingUtils";
import { verifyCreatorUpdatePayload } from "../verifiers/CreatorUpdateVerifier";
import { creatorService } from "../services/CreatorService";

export default function creatorUpdateController(app: App, payload: {method: 'creator_update', data: any}, msgSender: IWallet): "accept" {
    app.createReport(encodingUtils.encodingToBlockchain(payload));
    
    payload.data = verifyCreatorUpdatePayload(payload.data);
    
    app.createReport(encodingUtils.encodingToBlockchain(payload.data))
    
    const result = creatorService.patch(msgSender, payload.data)
    
    app.createNotice(encodingUtils.encodingToBlockchain(result));
    
    return "accept";
}