import { IChallengeCreatePayload } from "../models/IChallenge";
import { encodingUtils } from "../utils/EncodingUtils";

export default function verifyApplicationCreatePayload(data: any): IChallengeCreatePayload {
    if (!data.challengeId || typeof data.challengeId !== 'string') {
      throw new Error('challengeId must be a string');
    }
  
    if (!data.language || !['javascript', 'typescript', 'python', 'go'].includes(data.language)) {
      throw new Error('SupportedLanguages must be an array of ILanguage');
    }
  
    if (!data.sourceCode || typeof data.sourceCode !== 'string') {
      throw new Error('sourceCode must be a string');
    } else if(data.sourceCode) {
      data.sourceCode = encodingUtils.base64Decode(data.sourceCode);
    }
  
    return data;
}