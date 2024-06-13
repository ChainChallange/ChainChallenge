import { applicationExecutionService } from "../src/services/ApplicationExecutionService";
import { challengeExecutionService } from "../src/services/ChallengeExecutionService";

const jsCode = `export function sum (a: number, b: number) {
  return a + b
}

export function sub (a: number, b: number) {
  return a - b
}`;

const testJsCode = `import { sum, sub } from "./tempFile";

interface TestCase {
  description: string;
  params: [number, number];
  expected: number;
}

declare global {
  var TestResultData: any;
  var results: any[];
}

const { TestResultData, results } = global;

const sumTestCases: TestCase[] = [
  { description: 'Teste de soma com 1 e 2', params: [1, 2], expected: 3 },
  { description: 'Teste de soma com 5 e 7', params: [5, 7], expected: 12 },
  // Adicione mais casos de teste de soma conforme necessário
];

const subTestCases: TestCase[] = [
  { description: 'Teste de subtração com 5 e 2', params: [5, 2], expected: 3 },
  { description: 'Teste de subtração com 10 e 7', params: [10, 7], expected: 3 },
  // Adicione mais casos de teste de subtração conforme necessário
];

describe('Exemplo de Testes de Operações Aritméticas', () => {
  describe('Testes de Soma', () => {
    test.each(sumTestCases)(
      '$description', // Use o valor de 'description' como descrição do teste
      ({ description, params, expected }: TestCase) => {
        const startTime = process.hrtime();
        let passed = false;
        try {
          const result = sum(...params); // Chame a função sum com os parâmetros
          expect(result).toBe(expected); // Verifique se o resultado está correto
          passed = true;
        } catch (error) {
          console.log(error);
        } finally {
          console.log('finalizou os testes de soma');
          const endTime = process.hrtime(startTime);
          const elapsedTimeInSeconds = endTime[0] + endTime[1] / Math.pow(10, 9);
          results.push(new TestResultData(description, passed, elapsedTimeInSeconds.toFixed(9)));
        }
      }
    );
  });

  describe('Testes de Subtração', () => {
    test.each(subTestCases)(
      '$description', // Use o valor de 'description' como descrição do teste
      ({ description, params, expected }: TestCase) => {
        const startTime = process.hrtime();
        let passed = false;
        try {
          const result = sub(...params); // Chame a função sub com os parâmetros
          expect(result).toBe(expected); // Verifique se o resultado está correto
          passed = true;
        } catch (error) {
          console.log(error);
        } finally {
          console.log('finalizou os testes de subtração');
          const endTime = process.hrtime(startTime);
          const elapsedTimeInSeconds = endTime[0] + endTime[1] / Math.pow(10, 9);
          results.push(new TestResultData(description, passed, elapsedTimeInSeconds.toFixed(9)));
        }
      }
    );
  });
});`;

const challenge = challengeExecutionService.createChallengeAndGetTests({
  wallet: 'wallet criador aqui',
  title: 'Título aqui',
  description: 'Descrição aqui',
  difficulty: 'hard',
  category: 'js',
  sourceCodeLanguages: {
    typescript: testJsCode
  },
  attemptTemplateSourceCodeLanguages: {
    typescript: jsCode,
  },
  supportedLanguages: ['typescript'],
})

console.log('Challenge Criado: ', challenge);


const application = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'typescript', jsCode);
console.log('Aplicação Criada: ', application);