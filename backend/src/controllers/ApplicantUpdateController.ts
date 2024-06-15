import { IWallet } from "../models/types/IWallet";
import { App } from '@deroll/core'
import { encodingUtils } from "../utils/EncodingUtils";
import { verifyApplicantUpdatePayload } from "../verifiers/ApplicantUpdateVerifier";
import { applicantService } from "../services/ApplicantService";

export default function applicantUpdateController(app: App, payload: {method: 'applicant_update', data: any}, msgSender: IWallet): "accept" {
    app.createReport(encodingUtils.encodingToBlockchain(payload));
    
    payload.data = verifyApplicantUpdatePayload(payload.data);
    
    app.createReport(encodingUtils.encodingToBlockchain(payload.data))
    
    const result = applicantService.patch(msgSender, payload.data)
    
    app.createNotice(encodingUtils.encodingToBlockchain(result));
    
    return "accept";
}