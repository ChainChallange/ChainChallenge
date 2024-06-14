import { createApp } from "@deroll/app";
import * as viem from "viem";
import { createRouter } from "@deroll/router";
import { createWallet } from "@deroll/wallet";
import {
  decodeFunctionData,
  encodeFunctionData,
  parseAbi,
  Address,
  toHex,
} from "viem";
import { challengeExecutionService } from "./services/ChallengeExecutionService";
import { IPayloadMethod } from "./models/types/IPayloadMethods";
import { IChallengeCreatePayload } from "./models/IChallenge";
import { IWallet } from "./models/types/IWallet";
import { applicationExecutionService } from "./services/ApplicationExecutionService";
import { challengeService } from "./services/ChallengeService";
import { applicantService } from "./services/ApplicantService";
import { creatorService } from "./services/CreatorService";
import { applicationService } from "./services/ApplicationService";

export const ROLLUP_SERVER = process.env.ROLLUP_HTTP_SERVER_URL || "[http://127.0.0.1:5004](http://127.0.0.1:5004/)";

const app = createApp({ url: ROLLUP_SERVER });

const abi = parseAbi([
  "function withdrawEther(uint256)",
  "function safeMint(address,string)",
  "function deployAnyContract(bytes)",
  "function transferEther(address,uint256)",
  "function withdrawERC20(address,uint256)",
  "function mint(address,uint256,uint256,bytes)",
  "function transferERC20(address,address,uint256)",
]);

function base64Encode(data: any) {
  return Buffer.from(data).toString('base64');
}

function base64Decode(string: string) {
  return Buffer.from(string, 'base64').toString('utf-8')
}

function decodePayload(payload: any): Record<string, any> | null {
  return JSON.parse(viem.hexToString(payload));
}

function verifyPayload(payload: Record<string, any> | null): {method: IPayloadMethod, data: any} {
  if(!payload) {
    throw new Error('Payload cant be decoded');
  }

  if(!payload.method) {
    throw new Error('Payload needs to have an method field')
  }

  if(payload.method !== 'challenge' && payload.method !== 'application') {
    throw new Error('Method not allowed');
  }

  if(!payload.data) {
    throw new Error('No Payload Data found');
  }

  return payload as {method: IPayloadMethod, data: any};
}

function isValidDateString(dateString: any): boolean {
  return typeof dateString === 'string' && !isNaN(Date.parse(dateString));
}

function verifyChallengePayload(data: any): IChallengeCreatePayload {
  if(!data.title || typeof data.title != 'string') {
    throw new Error('Title must be an string')
  }

  if (!data.description || typeof data.description !== 'string') {
    throw new Error('Description must be a string');
  }

  if (data.category && typeof data.category !== 'string') {
    throw new Error('Category must be a string');
  }

  if (data.difficulty && typeof data.difficulty !== 'string') {
    throw new Error('Difficulty must be a string');
  }

  if (data.startDate && !isValidDateString(data.startDate)) {
    throw new Error('StartDate must be a valid ISO 8601 string');
  } else if(data.startDate) {
    data.startDate = new Date(data.startDate);
  }

  if (data.endDate !== undefined && data.endDate !== null && !isValidDateString(data.endDate)) {
    throw new Error('EndDate must be a valid ISO 8601 string or null');
  } else if(data.endDate) {
    data.endDate = new Date(data.endDate);
  }

  if (data.maxApplicationsAttempts !== undefined && data.maxApplicationsAttempts !== null && typeof data.maxApplicationsAttempts !== 'number') {
    throw new Error('MaxApplicationsAttempts must be a number or null');
  }

  if (data.maxApplications !== undefined && data.maxApplications !== null && typeof data.maxApplications !== 'number') {
    throw new Error('MaxApplications must be a number or null');
  }

  if (data.walletApplicantsOnly !== undefined && data.walletApplicantsOnly !== null && !Array.isArray(data.walletApplicantsOnly)) {
    throw new Error('WalletApplicantsOnly must be an array of IWallet or null');
  }

  if (!Array.isArray(data.supportedLanguages) || data.supportedLanguages.some((lang: string) => !['javascript', 'typescript', 'python', 'go'].includes(lang))) {
    throw new Error('SupportedLanguages must be an array of ILanguage');
  }

  if (data.minPassedTestsToComplete !== undefined && typeof data.minPassedTestsToComplete !== 'number') {
    throw new Error('MinPassedTestsToComplete must be a number');
  }

  if (typeof data.sourceCodeLanguages !== 'object' || data.sourceCodeLanguages === null) {
    throw new Error('SourceCodeLanguages must be an object');
  } else if(data.sourceCodeLanguages) {
    const sourceLanguages:any = {};

    if(data.sourceCodeLanguages.python) {
        sourceLanguages.python = base64Decode(data.sourceCodeLanguages.python)
    }

    if(data.sourceCodeLanguages.javascript) {
      sourceLanguages.javascript = base64Decode(data.sourceCodeLanguages.javascript)
    }

    if(data.sourceCodeLanguages.typescript) {
      sourceLanguages.typescript = base64Decode(data.sourceCodeLanguages.typescript)
    }

    if(data.sourceCodeLanguages.go) {
      sourceLanguages.go = base64Decode(data.sourceCodeLanguages.go)
    }
    
    data.sourceCodeLanguages = sourceLanguages;
  }

  if (typeof data.attemptTemplateSourceCodeLanguages !== 'object' || data.attemptTemplateSourceCodeLanguages === null) {
    throw new Error('AttemptTemplateSourceCodeLanguages must be an object');
  } else if(data.attemptTemplateSourceCodeLanguages) {
    const attemptTemplateSourceCodeLanguages:any = {};

    if(data.attemptTemplateSourceCodeLanguages.python) {
        attemptTemplateSourceCodeLanguages.python = base64Decode(data.attemptTemplateSourceCodeLanguages.python)
    }

    if(data.attemptTemplateSourceCodeLanguages.javascript) {
      attemptTemplateSourceCodeLanguages.javascript = base64Decode(data.attemptTemplateSourceCodeLanguages.javascript)
    }

    if(data.attemptTemplateSourceCodeLanguages.typescript) {
      attemptTemplateSourceCodeLanguages.typescript = base64Decode(data.attemptTemplateSourceCodeLanguages.typescript)
    }

    if(data.attemptTemplateSourceCodeLanguages.go) {
      attemptTemplateSourceCodeLanguages.go = base64Decode(data.attemptTemplateSourceCodeLanguages.go)
    }
    
    data.attemptTemplateSourceCodeLanguages = attemptTemplateSourceCodeLanguages;
  }

  return data;
}

function verifyApplicationPayload(data: any): IChallengeCreatePayload {
  if (!data.challengeId || typeof data.challengeId !== 'string') {
    throw new Error('challengeId must be a string');
  }

  if (!data.language || !['javascript', 'typescript', 'python', 'go'].includes(data.language)) {
    throw new Error('SupportedLanguages must be an array of ILanguage');
  }

  if (!data.sourceCode || typeof data.sourceCode !== 'string') {
    throw new Error('sourceCode must be a string');
  } else if(data.sourceCode) {
    data.sourceCode = base64Decode(data.sourceCode);
  }

  return data;
}

function verifyAndExecuteChallengeCreation(payload: {method: 'challenge', data: any}, msgSender: IWallet): "accept" {
  app.createReport({
    payload: toHex(JSON.stringify(payload))
  })

  payload.data = verifyChallengePayload(payload.data);

  app.createReport({
    payload: toHex(JSON.stringify(payload.data))
  })

  const result = challengeExecutionService.createChallengeAndGetTests({
    ...payload.data,
    wallet: msgSender
  })

  app.createNotice({
    payload: toHex(JSON.stringify(result))
  })

  return "accept";
}


function verifyAndExecuteApplication(payload: {method: 'application', data: any}, msgSender: IWallet): "accept" {
  app.createReport({
    payload: toHex(JSON.stringify(payload))
  })

  payload.data = verifyApplicationPayload(payload.data);

  app.createReport({
    payload: toHex(JSON.stringify(payload.data))
  })

  const result = applicationExecutionService.runChallengeAttemptAndSave(
    msgSender,
    payload.data.challengeId,
    payload.data.language,
    payload.data.sourceCode
  )

  app.createNotice({
    payload: toHex(JSON.stringify(result))
  })

  return "accept";
}

app.addAdvanceHandler(async ({ payload, metadata }) => {
  try {
    console.log('oi');
    app.createReport({
      payload: toHex('Começando o processamento')
    });

    const decodedPayload = verifyPayload(decodePayload(payload));

    switch(decodedPayload.method) {
      case 'challenge':
        return verifyAndExecuteChallengeCreation(decodedPayload as any, metadata.msg_sender);
        break;
      case 'application':
        return verifyAndExecuteApplication(decodedPayload as any, metadata.msg_sender);
        break;
    }

    app.createReport({
      payload: toHex('terminando o processamento sem entrar em nenhum method')
    });

    return 'reject';
  } catch (error: any) {
    console.log('erro: ', error);

    app.createReport({
      payload: toHex(String(error) + "=====================", error?.message) 
    })
    return 'reject';
  }
});

function doDefaultProcessing(payload: any, metadata: any) {
  const { functionName, args } = decodeFunctionData({ abi, data: payload });
  let to, amount, token, uri, id, encodedData, bytecode, data;
  switch (functionName) {
    case "transferEther":
      [to, amount] = args;
      wallet.transferEther(metadata.msg_sender, to, amount);
      app.createNotice({
        payload: toHex(
          `The account ${metadata.msg_sender} is transferring ${amount} wei from ${metadata.msg_sender} to ${to} at ${metadata.timestamp}`
        ),
      });
      return "accept";
    case "transferERC20":
      [token, to, amount] = args;
      wallet.transferERC20(token, metadata.msg_sender, to, amount);
      app.createNotice({
        payload: toHex(
          `The account ${metadata.msg_sender} is transferring ${amount} tokens ${token} from ${metadata.msg_sender} to ${to} at ${metadata.timestamp}`
        ),
      });
      return "accept";
    case "withdrawEther":
      [amount] = args;
      app.createVoucher(wallet.withdrawEther(metadata.msg_sender, amount));
      app.createNotice({
        payload: toHex(
          `The account ${metadata.msg_sender} is withdrawing ${amount} wei at ${metadata.timestamp}.`
        ),
      });
      return "accept";
    case "withdrawERC20":
      [token, amount] = args;
      app.createVoucher(
        wallet.withdrawERC20(token, metadata.msg_sender, amount)
      );
      app.createNotice({
        payload: toHex(
          `The account ${metadata.msg_sender} is withdrawing ${amount} tokens of ${token} at ${metadata.timestamp}.`
        ),
      });
      return "accept";
    case "safeMint":
      [to, uri] = args;
      encodedData = encodeFunctionData({
        abi: abi,
        functionName: "safeMint",
        args: [to, uri],
      });
      app.createVoucher({
        destination: "0xF320e7a3416Ee6B4DEe29333451b17534833F9cC",
        payload: encodedData,
      });
      app.createNotice({
        payload: toHex(`The account ${metadata.msg_sender} is minting a token with uri ${uri} to ${to} at ${metadata.timestamp}.`),
      });
      return "accept";
    case "mint":
      [to, id, amount, data] = args;
      encodedData = encodeFunctionData({
        abi: abi,
        functionName: "mint",
        args: [to, id, amount, data],
      });
      app.createVoucher({
        destination: "0x4c4d35E8bf193183c1E5D66397A475c3c78C4F9D",
        payload: encodedData,
      });
      app.createNotice({
        payload: toHex(
          `The account ${metadata.msg_sender} is minting ${amount} tokens of id ${id} to ${to} at ${metadata.timestamp}.`
        ),
      });
      return "accept";
    case "deployAnyContract":
      [bytecode] = args;
      encodedData = encodeFunctionData({
        abi: abi,
        functionName: "deployAnyContract",
        args: [bytecode],
      });
      app.createVoucher({
        destination: "0x87B6f9486B4474947884F1374f008a5745605d2B",
        payload: encodedData,
      });
      app.createNotice({
        payload: toHex(
          `The account ${metadata.msg_sender} is deploying a contract at ${metadata.timestamp}.`
        ),
      });
      return "accept";
  }
}

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