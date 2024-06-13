import { IChallengeCreateAndRunTests, ILanguageTestsObj, ITestLanguage } from "../models/IChallenge";
import { IUuid } from "../models/types/IUuid";
import { executionUtils } from "../utils/ExecutionUtils";
import { Uuid } from "../utils/Uuid";
import { challengeService } from "./ChallengeService";
import { creatorService } from "./CreatorService";

class ChallengeExecutionService {
    createChallengeAndGetTests(data: IChallengeCreateAndRunTests) {
        const tests: ILanguageTestsObj = {}

        let quantityTests = 0;
        data.supportedLanguages.forEach(language => {
            const results = executionUtils.createAndRun(
                language, 
                data.attemptTemplateSourceCodeLanguages[language] as string,
                data.sourceCodeLanguages[language] as string
            )
    
            if(results) {
                quantityTests = results?.length as number;

                const languageTests: Record<IUuid, ITestLanguage> = {}

                results?.forEach(result => {
                    const id = Uuid();
                    
                    languageTests[id] = {
                    title: result.name,
                    code: '',
                    id,
                    }
                })

                tests[language] = languageTests;
            }
        });

        if(!creatorService.find(data.wallet)){
            creatorService.create({
            wallet: data.wallet
            })
        }

        return challengeService.createAndUpdateCreator({
            wallet_of_creator: data.wallet,
            title: data.title,
            description: data.description,
            
            category: data.category,
            difficulty: data.difficulty,

            start_date: data.startDate,
            end_date: data.endDate,
            max_applications: data.maxApplications,
            max_applications_attempts: data.maxApplicationsAttempts,
            min_passed_tests_to_complete: data.minPassedTestsToComplete,
            wallet_of_applicants_only: data.walletApplicantsOnly,
            attempt_template_source_code_languages: data.attemptTemplateSourceCodeLanguages,
            source_code_languages: data.sourceCodeLanguages,
            supported_languages: data.supportedLanguages,

            tests: tests
        })
    }
}

export const challengeExecutionService = new ChallengeExecutionService();