import { applicantService } from "../src/services/ApplicantService";
import { applicationExecutionService } from "../src/services/ApplicationExecutionService";
import { challengeExecutionService } from "../src/services/ChallengeExecutionService";
import { challengeService } from "../src/services/ChallengeService";
import { creatorService } from "../src/services/CreatorService";
import { rankingService } from "../src/services/RankingService";

const jsCodeOk = `export function sum (a, b) {
    return a + b
  }
  export function sub (a, b) {
    return a - b
  }`;

const jsCodeTemplate = `export function sum (a, b) {
    
  }
  export function sub (a, b) {
    
  }`;

const jsCodeError = `export function sum (a, b) 
    return a + b
  }
  export function sub (a, b) {
    return a - b
  }`;

const jsCodeFail = `export function sum (a, b) {
    return a - b
  }
  export function sub (a, b) {
    return a - b
  }`;

const jsCodeWithoutOneFunc = `
  export function sub (a, b) {
    return a - b
  }`;
  
  const testJsCode = `
  import { sum, sub } from "./tempFile";
  
  class TestCase {
    constructor(description, params, expected) {
      this.description = description;
      this.params = params;
      this.expected = expected;
    }
  }
  
  const { TestResultData, results } = global;
  
  const sumTestCases = [
    { description: 'Teste de soma com 1 e 2', params: [1, 2], expected: 3 },
    { description: 'Teste de soma com 5 e 7', params: [5, 7], expected: 12 },
    // Add more sum test cases as needed
  ];
  
  const subTestCases = [
    { description: 'Teste de subtração com 5 e 2', params: [5, 2], expected: 3 },
    { description: 'Teste de subtração com 10 e 7', params: [10, 7], expected: 3 },
    // Add more subtraction test cases as needed
  ];
  
  describe('Exemplo de Testes de Operações Aritméticas', () => {
    describe('Testes de Soma', () => {
      test.each(sumTestCases)(
        '$description', // Use the value of 'description' as test description
        ({ description, params, expected }) => {
          const startTime = process.hrtime();
          let passed = false;
          try {
            const result = sum(...params); // Call the sum function with parameters
            expect(result).toBe(expected); // Check if the result is correct
            passed = true;
          } catch (error) {
            console.log(error) // Re-throw the error to fail the test correctly
          } finally {
            console.log('Teste finalizado');
            const endTime = process.hrtime(startTime);
            const elapsedTimeInSeconds = endTime[0] + endTime[1] / Math.pow(10, 9); // Calculate the elapsed time
            results.push(new TestResultData(description, passed, elapsedTimeInSeconds.toFixed(9)));
          }
        }
      );
    });
  
    describe('Testes de Subtração', () => {
      test.each(subTestCases)(
        '$description', // Use the value of 'description' as test description
        ({ description, params, expected }) => {
          const startTime = process.hrtime();
          let passed = false;
          try {
            const result = sub(...params); // Call the sub function with parameters
            expect(result).toBe(expected); // Check if the result is correct
            passed = true;
          } catch (error) {
            console.log(error); // Re-throw the error to fail the test correctly
          } finally {
            console.log('Teste finalizado');
            const endTime = process.hrtime(startTime);
            const elapsedTimeInSeconds = endTime[0] + endTime[1] / Math.pow(10, 9);
            results.push(new TestResultData(description, passed, elapsedTimeInSeconds.toFixed(9)));
          }
        }
      );
    });
  });`;
  
console.log("\n=== CREATING CHALLENGE ===");
const challenge = challengeExecutionService.createChallengeAndGetTests({
    wallet: 'wallet criador aqui',
    title: 'Título aqui',
    description: 'Descrição aqui',
    difficulty: 'hard',
    category: 'js',
    maxApplications: 2,
    maxApplicationsAttempts: 5,
    sourceCodeLanguages: {
      javascript: testJsCode
    },
    attemptTemplateSourceCodeLanguages: {
      javascript: jsCodeTemplate,
    },
    supportedLanguages: ['javascript'],
  })
  
  if(!challenge) {
    throw new Error('Challenge dont created')
  }


  if(challenge.quantity_of_tests !== 4) {
    throw new Error('Quantity of tests dont match ' + challenge.quantity_of_tests)
  }
  
  
console.log("\n=== CREATING ERROR APPLICATION ===");
{
  const applicationError = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeError);

  if(applicationError.attempt_number != 1) {
    throw new Error('Attempt number wrong ' + applicationError.attempt_number);
  }

  if(applicationError.tests_failed !== 4 || applicationError.tests_passed !== 0) {
    throw new Error('Tests are wrong ')
  }

  if(applicationError.passed) {
    throw new Error('Test Passed');
  }

  const createdChallenge = challengeService.find(challenge.id);

  if(!createdChallenge) {
    throw new Error('Challenge lost data');
  }

  if(createdChallenge.quantity_of_applications !== 1) {
    throw new Error('Wrong applications quantity ' + createdChallenge.quantity_of_applications);
  }

  if(createdChallenge.quantity_of_applications_accepted !== 0) {
    throw new Error('Wrong applications accepted quantity ' + createdChallenge.quantity_of_applications_accepted);
  }
  
  if(createdChallenge.quantity_of_applications_rejected !== 1) {
    throw new Error('Wrong applications rejected quantity ' + createdChallenge.quantity_of_applications_rejected);
  }

  if(createdChallenge.quantity_of_applications_attempts !== 1) {
    throw new Error('Wrong applications attempts quantity ' + createdChallenge.quantity_of_applications_attempts);
  }

  if(createdChallenge.quantity_of_applications_accepted_attempts !== 0) {
    throw new Error('Wrong applications accepted attempts quantity ' + createdChallenge.quantity_of_applications_accepted_attempts);
  }

  if(createdChallenge.quantity_of_applications_rejected_attempts !== 1) {
    throw new Error('Wrong applications rejected attempts quantity ' + createdChallenge.quantity_of_applications_rejected_attempts);
  }

  if(createdChallenge.applications_accepted_ranking.length !== 0) {
    throw new Error('Wrong applications ranking quantity ' + createdChallenge.applications_accepted_ranking.length);
  }

}
  console.log("\n=== CREATING FAIL APPLICATION ===");
{  
  const applicationFail = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeFail);

  if(applicationFail.attempt_number != 2) {
    throw new Error('Attempt number wrong ' + applicationFail.attempt_number)
  }

  if(applicationFail.tests_failed !== 2 || applicationFail.tests_passed !== 2) {
    throw new Error('Tests are wrong ')
  }

  if(applicationFail.passed) {
    throw new Error('Test Passed');
  }

  const createdChallenge = challengeService.find(challenge.id);

  if(!createdChallenge) {
    throw new Error('Challenge lost data');
  }

  if(createdChallenge.quantity_of_applications !== 1) {
    throw new Error('Wrong applications quantity ' + createdChallenge.quantity_of_applications);
  }

  if(createdChallenge.quantity_of_applications_accepted !== 0) {
    throw new Error('Wrong applications accepted quantity ' + createdChallenge.quantity_of_applications_accepted);
  }
  
  if(createdChallenge.quantity_of_applications_rejected !== 1) {
    throw new Error('Wrong applications rejected quantity ' + createdChallenge.quantity_of_applications_rejected);
  }

  if(createdChallenge.quantity_of_applications_attempts !== 2) {
    throw new Error('Wrong applications attempts quantity ' + createdChallenge.quantity_of_applications_attempts);
  }

  if(createdChallenge.quantity_of_applications_accepted_attempts !== 0) {
    throw new Error('Wrong applications accepted attempts quantity ' + createdChallenge.quantity_of_applications_accepted_attempts);
  }

  if(createdChallenge.quantity_of_applications_rejected_attempts !== 2) {
    throw new Error('Wrong applications rejected attempts quantity ' + createdChallenge.quantity_of_applications_rejected_attempts);
  }

  if(createdChallenge.applications_accepted_ranking.length !== 0) {
    throw new Error('Wrong applications ranking quantity ' + createdChallenge.applications_accepted_ranking.length);
  }

}
  console.log("\n=== CREATING OK APPLICATION ===");
{  
  const applicationOk = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeOk);

  if(applicationOk.attempt_number != 3) {
    throw new Error('Attempt number wrong ' + applicationOk.attempt_number)
  }

  if(applicationOk.tests_failed !== 0 || applicationOk.tests_passed !== 4) {
    throw new Error('Tests are wrong ')
  }

  if(!applicationOk.passed) {
    throw new Error('Test DONT Passed');
  }

  const createdChallenge = challengeService.find(challenge.id);

  if(!createdChallenge) {
    throw new Error('Challenge lost data');
  }

  if(createdChallenge.quantity_of_applications !== 1) {
    throw new Error('Wrong applications quantity ' + createdChallenge.quantity_of_applications);
  }

  if(createdChallenge.quantity_of_applications_accepted !== 1) {
    throw new Error('Wrong applications accepted quantity ' + createdChallenge.quantity_of_applications_accepted);
  }
  
  if(createdChallenge.quantity_of_applications_rejected !== 0) {
    throw new Error('Wrong applications rejected quantity ' + createdChallenge.quantity_of_applications_rejected);
  }

  if(createdChallenge.quantity_of_applications_attempts !== 3) {
    throw new Error('Wrong applications attempts quantity ' + createdChallenge.quantity_of_applications_attempts);
  }

  if(createdChallenge.quantity_of_applications_accepted_attempts !== 1) {
    throw new Error('Wrong applications accepted attempts quantity ' + createdChallenge.quantity_of_applications_accepted_attempts);
  }

  if(createdChallenge.quantity_of_applications_rejected_attempts !== 2) {
    throw new Error('Wrong applications rejected attempts quantity ' + createdChallenge.quantity_of_applications_rejected_attempts);
  }

  if(createdChallenge.applications_accepted_ranking.length !== 1) {
    throw new Error('Wrong applications ranking quantity ' + createdChallenge.applications_accepted_ranking.length);
  }
}
  console.log("\n=== CREATING WITHOUT ONE FUNCTION APPLICATION ===");
{  
  const applicationWithoutOneFunction = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeWithoutOneFunc);

  if(applicationWithoutOneFunction.attempt_number != 4) {
    throw new Error('Attempt number wrong ' + applicationWithoutOneFunction.attempt_number)
  }

  if(applicationWithoutOneFunction.tests_failed !== 2 || applicationWithoutOneFunction.tests_passed !== 2) {
    throw new Error('Tests are wrong ')
  }

  if(applicationWithoutOneFunction.passed) {
    throw new Error('Test Passed');
  }

  const createdChallenge = challengeService.find(challenge.id);

  if(!createdChallenge) {
    throw new Error('Challenge lost data');
  }

  if(createdChallenge.quantity_of_applications !== 1) {
    throw new Error('Wrong applications quantity ' + createdChallenge.quantity_of_applications);
  }

  if(createdChallenge.quantity_of_applications_accepted !== 1) {
    throw new Error('Wrong applications accepted quantity ' + createdChallenge.quantity_of_applications_accepted);
  }
  
  if(createdChallenge.quantity_of_applications_rejected !== 0) {
    throw new Error('Wrong applications rejected quantity ' + createdChallenge.quantity_of_applications_rejected);
  }

  if(createdChallenge.quantity_of_applications_attempts !== 4) {
    throw new Error('Wrong applications attempts quantity ' + createdChallenge.quantity_of_applications_attempts);
  }

  if(createdChallenge.quantity_of_applications_accepted_attempts !== 1) {
    throw new Error('Wrong applications accepted attempts quantity ' + createdChallenge.quantity_of_applications_accepted_attempts);
  }

  if(createdChallenge.quantity_of_applications_rejected_attempts !== 3) {
    throw new Error('Wrong applications rejected attempts quantity ' + createdChallenge.quantity_of_applications_rejected_attempts);
  }

  if(createdChallenge.applications_accepted_ranking.length !== 1) {
    throw new Error('Wrong applications ranking quantity ' + createdChallenge.applications_accepted_ranking.length);
  }
}

console.log("\n=== CREATING WITHOUT ONE FUNCTION APPLICATION 2 ===");
{  
  const applicationWithoutOneFunction = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeWithoutOneFunc);

  if(applicationWithoutOneFunction.attempt_number != 5) {
    throw new Error('Attempt number wrong ' + applicationWithoutOneFunction.attempt_number)
  }

  if(applicationWithoutOneFunction.tests_failed !== 2 || applicationWithoutOneFunction.tests_passed !== 2) {
    throw new Error('Tests are wrong ')
  }

  if(applicationWithoutOneFunction.passed) {
    throw new Error('Test Passed');
  }

  const createdChallenge = challengeService.find(challenge.id);

  if(!createdChallenge) {
    throw new Error('Challenge lost data');
  }

  if(createdChallenge.quantity_of_applications !== 1) {
    throw new Error('Wrong applications quantity ' + createdChallenge.quantity_of_applications);
  }

  if(createdChallenge.quantity_of_applications_accepted !== 1) {
    throw new Error('Wrong applications accepted quantity ' + createdChallenge.quantity_of_applications_accepted);
  }
  
  if(createdChallenge.quantity_of_applications_rejected !== 0) {
    throw new Error('Wrong applications rejected quantity ' + createdChallenge.quantity_of_applications_rejected);
  }

  if(createdChallenge.quantity_of_applications_attempts !== 5) {
    throw new Error('Wrong applications attempts quantity ' + createdChallenge.quantity_of_applications_attempts);
  }

  if(createdChallenge.quantity_of_applications_accepted_attempts !== 1) {
    throw new Error('Wrong applications accepted attempts quantity ' + createdChallenge.quantity_of_applications_accepted_attempts);
  }

  if(createdChallenge.quantity_of_applications_rejected_attempts !== 4) {
    throw new Error('Wrong applications rejected attempts quantity ' + createdChallenge.quantity_of_applications_rejected_attempts);
  }

  if(createdChallenge.applications_accepted_ranking.length !== 1) {
    throw new Error('Wrong applications ranking quantity ' + createdChallenge.applications_accepted_ranking.length);
  }
}

console.log("\n=== TRYING CREATING OVER LIMIT ATTEMPTS ===");
{  
    let isGettingError = false
    try {
        applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeWithoutOneFunc);
    } catch (error) {
        isGettingError = true;
    }

    if(!isGettingError) {
        throw new Error('Application must fail because attempts number')
    }


}

console.log("\n=== CREATING FAIL APLICATION - 2 WALLET ===");
{  
    const applicationFail = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui 2', challenge.id, 'javascript', jsCodeFail);

  if(applicationFail.attempt_number != 1) {
    throw new Error('Attempt number wrong ' + applicationFail.attempt_number)
  }

  if(applicationFail.tests_failed !== 2 || applicationFail.tests_passed !== 2) {
    throw new Error('Tests are wrong ')
  }

  if(applicationFail.passed) {
    throw new Error('Test Passed');
  }

  const createdChallenge = challengeService.find(challenge.id);

  if(!createdChallenge) {
    throw new Error('Challenge lost data');
  }

  if(createdChallenge.quantity_of_applications !== 2) {
    throw new Error('Wrong applications quantity ' + createdChallenge.quantity_of_applications);
  }

  if(createdChallenge.quantity_of_applications_accepted !== 1) {
    throw new Error('Wrong applications accepted quantity ' + createdChallenge.quantity_of_applications_accepted);
  }
  
  if(createdChallenge.quantity_of_applications_rejected !== 1) {
    throw new Error('Wrong applications rejected quantity ' + createdChallenge.quantity_of_applications_rejected);
  }

  if(createdChallenge.quantity_of_applications_attempts !== 6) {
    throw new Error('Wrong applications attempts quantity ' + createdChallenge.quantity_of_applications_attempts);
  }

  if(createdChallenge.quantity_of_applications_accepted_attempts !== 1) {
    throw new Error('Wrong applications accepted attempts quantity ' + createdChallenge.quantity_of_applications_accepted_attempts);
  }

  if(createdChallenge.quantity_of_applications_rejected_attempts !== 5) {
    throw new Error('Wrong applications rejected attempts quantity ' + createdChallenge.quantity_of_applications_rejected_attempts);
  }

  if(createdChallenge.applications_accepted_ranking.length !== 1) {
    throw new Error('Wrong applications ranking quantity ' + createdChallenge.applications_accepted_ranking.length);
  }
}

console.log("\n=== CREATING OK APLICATION - 2 WALLET ===");
{  
    const applicationFail = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui 2', challenge.id, 'javascript', jsCodeOk);

  if(applicationFail.attempt_number != 2) {
    throw new Error('Attempt number wrong ' + applicationFail.attempt_number)
  }

  if(applicationFail.tests_failed !== 0 || applicationFail.tests_passed !== 4) {
    throw new Error('Tests are wrong ')
  }

  if(!applicationFail.passed) {
    throw new Error('Test FAILD');
  }

  const createdChallenge = challengeService.find(challenge.id);

  if(!createdChallenge) {
    throw new Error('Challenge lost data');
  }

  if(createdChallenge.quantity_of_applications !== 2) {
    throw new Error('Wrong applications quantity ' + createdChallenge.quantity_of_applications);
  }

  if(createdChallenge.quantity_of_applications_accepted !== 2) {
    throw new Error('Wrong applications accepted quantity ' + createdChallenge.quantity_of_applications_accepted);
  }
  
  if(createdChallenge.quantity_of_applications_rejected !== 0) {
    throw new Error('Wrong applications rejected quantity ' + createdChallenge.quantity_of_applications_rejected);
  }

  if(createdChallenge.quantity_of_applications_attempts !== 7) {
    throw new Error('Wrong applications attempts quantity ' + createdChallenge.quantity_of_applications_attempts);
  }

  if(createdChallenge.quantity_of_applications_accepted_attempts !== 2) {
    throw new Error('Wrong applications accepted attempts quantity ' + createdChallenge.quantity_of_applications_accepted_attempts);
  }

  if(createdChallenge.quantity_of_applications_rejected_attempts !== 5) {
    throw new Error('Wrong applications rejected attempts quantity ' + createdChallenge.quantity_of_applications_rejected_attempts);
  }

  if(createdChallenge.applications_accepted_ranking.length !== 2) {
    throw new Error('Wrong applications ranking quantity ' + createdChallenge.applications_accepted_ranking.length);
  }

  if(createdChallenge.applications_accepted_ranking[1].id !== applicationFail.id) {
    console.log(createdChallenge.applications_accepted_ranking)
    throw new Error('Wrong RANKING POSITION');
  }
}

console.log("\n=== TRYING CREATING OVER LIMIT APPLICATIONS - WALLET 1 ===");
{  
    let isGettingError = false
    try {
        applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeWithoutOneFunc);
    } catch (error) {
        isGettingError = true;
    }

    if(!isGettingError) {
        throw new Error('Application must fail because applications number')
    }

}

console.log("\n=== TRYING CREATING OVER LIMIT APPLICATIONS - WALLET 2 ===");
{  
    let isGettingError = false
    try {
        applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui 2', challenge.id, 'javascript', jsCodeWithoutOneFunc);
    } catch (error) {
        isGettingError = true;
    }

    if(!isGettingError) {
        throw new Error('Application must fail because applications number')
    }

}

console.log("\n=== TRYING CREATING OVER LIMIT APPLICATIONS - WALLET 3 ===");
{  
    let isGettingError = false
    try {
        applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui 3', challenge.id, 'javascript', jsCodeWithoutOneFunc);
    } catch (error) {
        isGettingError = true;
    }

    if(!isGettingError) {
        throw new Error('Application must fail because applications number')
    }

}


console.log("\n=== TRYING TO UPDATE WALLET 1 (CREATOR) ===");
{  
    creatorService.patch('wallet criador aqui', {
        image_link: 'test image',
        nickname: 'Rafa' 
    });

    const creator = creatorService.find('wallet criador aqui');

    if(!creator) {
        throw new Error('CANT FIND created creator');
    }

    if(creator.image_link !== 'test image') {
        throw new Error('IMAGE LINK NOT UPDATED');
    }

    if(creator.nickname !== 'Rafa') {
        throw new Error('IMAGE NICKNAME NOT UPDATED');
    }

}

console.log("\n=== TRYING TO UPDATE WALLET 1 (aplicante) ===");
{  
    applicantService.patch('Wallet aplicante aqui', {
        image_link: 'test image hehe',
        nickname: 'Rafa 1' 
    });

    const applicant = applicantService.find('Wallet aplicante aqui');

    if(!applicant) {
        throw new Error('CANT FIND created creator');
    }

    if(applicant.image_link !== 'test image hehe') {
        throw new Error('IMAGE LINK NOT UPDATED');
    }

    if(applicant.nickname !== 'Rafa 1') {
        throw new Error('IMAGE NICKNAME NOT UPDATED');
    }

}

console.log("\n=== VERIFY RANKING POST CHANGE ===");
{  
    const ranking = rankingService.findByWallet('Wallet aplicante aqui');

    if(!ranking) {
        throw new Error('Cant find ranking');
    }

    if(ranking.nickname !== 'Rafa 1') {
        throw new Error('NINCKNAME not UPDATED ' + ranking.nickname);
    }

    if(ranking.image_link !== 'test image hehe') {
        throw new Error('IMAGE LINK NOT UPDATED');
    }
}


console.log("\n\n======================== ALL TESTS OK ========================")