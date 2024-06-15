import { environmentVars } from "./config/Environment";
import { createApp } from "@deroll/app";
import { createRouter } from "@deroll/router";
import { createWallet } from "@deroll/wallet";
import { challengeService } from "./services/ChallengeService";
import { applicantService } from "./services/ApplicantService";
import { creatorService } from "./services/CreatorService";
import { applicationService } from "./services/ApplicationService";
import { rankingService } from "./services/RankingService";
import { encodingUtils } from "./utils/EncodingUtils";
import verifyPayload from "./verifiers/GeneralPayloadVerifier";
import { challengeCreateController } from "./controllers/ChallengeCreateController";
import applicationCreateController from "./controllers/ApplicationCreateController";
import challengeUpdateController from "./controllers/ChallengeUpdateController";
import applicantUpdateController from "./controllers/ApplicantUpdateController";
import creatorUpdateController from "./controllers/CreatorUpdateController";

const app = createApp({ url: environmentVars.ROLLUP_HTTP_SERVER_URL });

app.addAdvanceHandler(async ({ payload, metadata }) => {
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
});

// create wallet
const wallet = createWallet();

app.addAdvanceHandler(wallet.handler);

const router = createRouter({ app });


// Applicants
router.add(
  "applicants",
  () => {
    try {
      return JSON.stringify(applicantService.list());
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ applicantWallet: string }>(
  "applicants/:applicantWallet",
  ({ params: { applicantWallet } }) => {
    try {
      return JSON.stringify(applicantService.find(applicantWallet));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ applicationId: string }>(
  "applicants/applications/:applicationId",
  ({ params: { applicationId } }) => {
    try {
      return JSON.stringify(applicantService.findByApplicationId(applicationId));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ challengeId: string }>(
  "applicants/challenges/:challengeId",
  ({ params: { challengeId } }) => {
    try {
      return JSON.stringify(applicantService.listByChallengeId(challengeId));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

// Applicants
router.add(
  "creators",
  () => {
    try {
      return JSON.stringify(creatorService.list());
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ creatorWallet: string }>(
  "creators/:creatorWallet",
  ({ params: { creatorWallet } }) => {
    try {
      return JSON.stringify(creatorService.find(creatorWallet));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ applicationId: string }>(
  "creators/applications/:applicationId",
  ({ params: { applicationId } }) => {
    try {
      return JSON.stringify(creatorService.findByApplicationId(applicationId));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

// Ranking
router.add(
  "ranking",
  () => {
    try {
      return JSON.stringify(rankingService.list());
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add< {applicantWallet: string}>(
  "ranking/:applicantWallet",
  ({ params: { applicantWallet } }) => {
    try {
      return JSON.stringify(rankingService.findByWallet(applicantWallet));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

// Challenges
router.add(
  "challenges",
  () => {
    try {
      return JSON.stringify(challengeService.list());
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ challengeId: string }>(
  "challenges/:challengeId",
  ({ params: { challengeId } }) => {
    try {
      return JSON.stringify(challengeService.find(challengeId));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ applicationId: string }>(
  "challenges/applications/:applicationId",
  ({ params: { applicationId } }) => {
    try {
      return JSON.stringify(challengeService.findByApplication(applicationId));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ creatorWallet: string }>(
  "challenges/creators/:creatorWallet",
  ({ params: { creatorWallet } }) => {
    try {
      return JSON.stringify(challengeService.listByCreator(creatorWallet));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

// Applications
router.add(
  "applications",
  () => {
    try {
      return JSON.stringify(applicationService.list());
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ applicationId: string }>(
  "applications/:applicationId",
  ({ params: { applicationId } }) => {
    try {
      return JSON.stringify(applicationService.find(applicationId));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ challengeId: string }>(
  "applications/challenges/:challengeId",
  ({ params: { challengeId } }) => {
    try {
      return JSON.stringify(applicationService.listByChallenge(challengeId));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ challengeId: string, applicantWallet: string }>(
  "applications/challenges/:challengeId/applicants/:applicantWallet",
  ({ params: { challengeId, applicantWallet } }) => {
    try {
      return JSON.stringify(applicationService.listByChallangeAndApplicant(challengeId, applicantWallet));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ creatorWallet: string }>(
  "applications/creators/:creatorWallet",
  ({ params: { creatorWallet } }) => {
    try {
      return JSON.stringify(applicationService.listByCreator(creatorWallet));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }
  }
);

router.add<{ applicantWallet: string }>(
  "applications/applicants/:applicantWallet",
  ({ params: { applicantWallet } }) => {
    try {
      return JSON.stringify(applicationService.listByApplicant(applicantWallet));
    } catch(error) {
      console.log('error:', error);
      throw error;
    }

  }
);

app.addInspectHandler(router.handler);

// start app
app.start().catch((e) => {
  console.error("Error starting the app:", e);
  process.exit(1);
});