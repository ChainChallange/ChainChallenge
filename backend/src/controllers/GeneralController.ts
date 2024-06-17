import { components } from "../schema";
import { App } from '@deroll/core'
import { encodingUtils } from "../utils/EncodingUtils";
import verifyPayload from "../verifiers/GeneralPayloadVerifier";
import { challengeCreateController } from "./ChallengeCreateController";
import challengeUpdateController from "./ChallengeUpdateController";
import applicationCreateController from "./ApplicationCreateController";
import applicantUpdateController from "./ApplicantUpdateController";
import creatorUpdateController from "./CreatorUpdateController";

export default function generalController(app: App, payload: string, metadata: components["schemas"]["Metadata"]) {
    try {
        const receivedDate = new Date();
        const receivedLog = `[${receivedDate.toISOString()}] Received a ADVANCE from [${metadata.msg_sender}]`; 
        console.log(receivedLog)
        app.createReport(encodingUtils.encodingToBlockchain(receivedLog));
    
        const decodedPayload = verifyPayload(encodingUtils.decodeBlockchainPayload(payload));
        console.log(`METHOD: ${decodedPayload.method}`)
    
        switch(decodedPayload.method) {
          case 'challenge':
            challengeCreateController(app, decodedPayload as any, metadata.msg_sender);
            break;
          case 'challenge_update':
            challengeUpdateController(app, decodedPayload as any, metadata.msg_sender);
            break;
          case 'application':
            applicationCreateController(app, decodedPayload as any, metadata.msg_sender);
            break;
          case 'applicant_update':
            applicantUpdateController(app, decodedPayload as any, metadata.msg_sender);
            break;
          case 'creator_update':
            creatorUpdateController(app, decodedPayload as any, metadata.msg_sender)
            break;
        }
    
        const finishedDate = new Date();
        const finishedLog = `[${finishedDate.toISOString()}] FINISHED a ADVANCE (method ${decodedPayload.method}) from [${metadata.msg_sender}] - ${finishedDate.getTime() - receivedDate.getTime()}ms`; 
        console.log(finishedLog)
        app.createReport(encodingUtils.encodingToBlockchain(finishedLog));
    
        return 'accept';
      } catch (error: any) {
        function logError(error: any) {
          try {
            console.log(`[${new Date().toISOString()}] ERROR catched in controller handler: `, error);
      
            app.createReport(encodingUtils.encodingToBlockchain({
              details: 'ERROR catched in controller handler',
              moment: new Date().toISOString(),
              message: error?.message || error,
            }))
          } catch (catchError: any) {
            console.log('CATCHED ERROR', catchError);
          }
        }
    
        logError(error);
        return 'reject';
      }
}