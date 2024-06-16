import { applicationExecutionService } from "../src/services/ApplicationExecutionService";
import { challengeExecutionService } from "../src/services/ChallengeExecutionService";

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
  
console.log("=== CREATING CHALLENGE ===");
const challenge = challengeExecutionService.createChallengeAndGetTests({
    wallet: 'wallet criador aqui',
    title: 'Título aqui',
    description: 'Descrição aqui',
    difficulty: 'hard',
    category: 'js',
    maxApplications: 1,
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
  
  
  console.log("=== CREATING ERROR APPLICATION ===");

  const applicationError = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeError);

  if(applicationError.attempt_number != 1) {
    throw new Error('Attempt number wrong ' + applicationError.attempt_number)
  }

  if(applicationError.tests_failed !== 4 || applicationError.tests_passed !== 0) {
    throw new Error('Tests are wrong ')
  }

  if(applicationError.passed) {
    throw new Error('Test Passed');
  }

  console.log("=== CREATING FAIL APPLICATION ===");
  
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


  console.log("=== CREATING OK APPLICATION ===");
  
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

  console.log("=== CREATING WITHOUT ONE FUNCTION APPLICATION ===");
  
  const applicationWithoutOneFunction = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'javascript', jsCodeWithoutOneFunc);

  if(applicationWithoutOneFunction.attempt_number != 4) {
    throw new Error('Attempt number wrong ' + applicationWithoutOneFunction.attempt_number)
  }

  if(applicationWithoutOneFunction.tests_failed !== 4 || applicationWithoutOneFunction.tests_passed !== 0) {
    throw new Error('Tests are wrong ')
  }

  if(applicationWithoutOneFunction.passed) {
    throw new Error('Test Passed');
  }