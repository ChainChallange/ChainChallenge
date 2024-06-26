import { IApplicationTestOutput } from "../models/IApplication";
import { ILanguage } from "../models/types/ILanguage";
import { ISourceCode } from "../models/types/ISourceCode";
import { IUuid } from "../models/types/IUuid";
import { IWallet } from "../models/types/IWallet";
import { executionUtils } from "../utils/ExecutionUtils";
import { applicantService } from "./ApplicantService";
import { applicationService } from "./ApplicationService";
import { challengeService } from "./ChallengeService";

class ApplicationExecutionService {
    runChallengeAttemptAndSave(wallet: IWallet, challengeId: IUuid, language: ILanguage, sourceCode: ISourceCode) {
        const challenge = challengeService.find(challengeId);
      
        if(!challenge) {
          throw new Error('Challenge not found');
        }
      
        if(!challenge.source_code_languages[language]) {
          throw new Error('Challenge doesnt support this language');
        }
      
        const results = executionUtils.createAndRun(language, sourceCode, challenge.source_code_languages[language] as string);
      
        if(!results) {
          throw new Error('Tests results not found');
        }
      
        if(!applicantService.find(wallet)) {
          applicantService.create({wallet});
        }
      
        const testsOutputs: Record<IUuid, IApplicationTestOutput> = {};
      
        const challengeTests = Object.values(challenge.tests[language] || {});
      
        challengeTests.forEach(challengeTest => {
          const test = results.find(result => result.name === challengeTest.title);

            testsOutputs[challengeTest.id] = {
              result: test?.result || false,
              test_id: challengeTest.id,
              time_ms: test?.time || 9999
            }
        })
      
        return applicationService.createAndUpdateChallengeApplicantAndCreator({
          challenge_id: challengeId,
          language,
          source_code: sourceCode,
          wallet,
          test_outputs: testsOutputs,
        })
    }
}

export const applicationExecutionService = new ApplicationExecutionService();