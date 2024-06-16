
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
});