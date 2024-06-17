import { IChallengeCreatePayload } from "../models/IChallenge";
import { dateUtils } from "../utils/DateUtils";
import { encodingUtils } from "../utils/EncodingUtils";

export default function verifyChallengeCreatePayload(data: any): IChallengeCreatePayload {
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
  
    if (data.startDate && !dateUtils.isValidDateString(data.startDate)) {
      throw new Error('StartDate must be a valid ISO 8601 string');
    } else if(data.startDate) {
      data.startDate = new Date(data.startDate);
    }
  
    if (data.endDate !== undefined && data.endDate !== null && !dateUtils.isValidDateString(data.endDate)) {
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
          sourceLanguages.python = encodingUtils.base64Decode(data.sourceCodeLanguages.python)
      }
  
      if(data.sourceCodeLanguages.javascript) {
        sourceLanguages.javascript = encodingUtils.base64Decode(data.sourceCodeLanguages.javascript)
      }
  
      if(data.sourceCodeLanguages.typescript) {
        sourceLanguages.typescript = encodingUtils.base64Decode(data.sourceCodeLanguages.typescript)
      }
  
      if(data.sourceCodeLanguages.go) {
        sourceLanguages.go = encodingUtils.base64Decode(data.sourceCodeLanguages.go)
      }
      
      data.sourceCodeLanguages = sourceLanguages;
    }
  
    if (typeof data.attemptTemplateSourceCodeLanguages !== 'object' || data.attemptTemplateSourceCodeLanguages === null) {
      throw new Error('AttemptTemplateSourceCodeLanguages must be an object');
    } else if(data.attemptTemplateSourceCodeLanguages) {
      const attemptTemplateSourceCodeLanguages:any = {};
  
      if(data.attemptTemplateSourceCodeLanguages.python) {
          attemptTemplateSourceCodeLanguages.python = encodingUtils.base64Decode(data.attemptTemplateSourceCodeLanguages.python)
      }
  
      if(data.attemptTemplateSourceCodeLanguages.javascript) {
        attemptTemplateSourceCodeLanguages.javascript = encodingUtils.base64Decode(data.attemptTemplateSourceCodeLanguages.javascript)
      }
  
      if(data.attemptTemplateSourceCodeLanguages.typescript) {
        attemptTemplateSourceCodeLanguages.typescript = encodingUtils.base64Decode(data.attemptTemplateSourceCodeLanguages.typescript)
      }
  
      if(data.attemptTemplateSourceCodeLanguages.go) {
        attemptTemplateSourceCodeLanguages.go = encodingUtils.base64Decode(data.attemptTemplateSourceCodeLanguages.go)
      }
      
      data.attemptTemplateSourceCodeLanguages = attemptTemplateSourceCodeLanguages;
    }
  
    return data;
}