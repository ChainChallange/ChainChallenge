export const defaultTestJs = `import { sum, sub } from "./tempFile";

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
          const elapsedTimeInSeconds = endTime[0] + endTime[1] / Math.pow(10, 9); // Calculate the elapsed time
          results.push(new TestResultData(description, passed, elapsedTimeInSeconds.toFixed(9)));
        }
      }
    );
  });
});
`;


export const defaultTestTs = `import { sum, sub } from "./tempFile";

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
});
`;

export const defaultTestPy = `import pytest
import time
from tempFile import *

class TestResultData:
    def __init__(self, description, passed, execution_time):
        self.description = description
        self.passed = passed
        self.execution_time = execution_time

    def __str__(self):
        return f'"{self.description}","{"Passou" if self.passed else "Falhou"}","{self.execution_time:.6f}"'

results = []

# Fixture de sessão para configuração e limpeza
@pytest.fixture(scope="session", autouse=True)
def session_fixture():
    # Código de configuração aqui
    print("Iniciando a sessão de testes")

    yield

    # Código de limpeza aqui
    print(f"Resultados dos testes: {results}")
    print("Finalizando a sessão de testes")
    destroy()

def destroy():
    print("Executando método destroy")
    with open('outputs/test_results.txt', 'w') as file:
        for result in results:
            file.write(str(result) + '\\n')
            print(result)
    print("Resultados dos testes escritos em 'test_results.txt'.")
    return results

"""
Não altere esse if, ele é necessário para executar os testes.
"""
if __name__ == '__main__':
    pytest.main(["-s"])

"""
Todos os testes devem ter os blocos try/except/finally para capturar exceções e calcular o tempo de execução.
Além disso, o resultado de cada teste deve ser armazenado na lista 'results', com a seguinte estrutura:
results.append(TestResultData(
    description:    "Descrição do teste",
    passed:         True ou False,
    execution_time: tempo de execução do teste
))
"""

"""
Para cada função que você deseja testar, você deve adicionar um teste parametrizado.
A função de teste deve ter a seguinte estrutura:
@pytest.mark.parametrize("description, a, b, ...(demais argumentos), expected", [
    ("Descrição do teste", valor_de_a, valor_de_b, ...(demais argumentos), valor_esperado),
])
def test_nome_da_funcao(description, a, b, ...(demais argumentos), expected):

Implemente os testes abaixo, sem alterar o código acima.
"""

@pytest.mark.parametrize("description, a, b, expected", [
    ("teste 1 + 2", 1, 2, 3),
    ("teste 2 + 2", 2, 2, 4),
    ("teste 3 + 2", 3, 2, 5),
])
def test_sum(description, a, b, expected):
    start_time = time.time()
    passed = False
    try:
        assert sum(a, b) == expected
        print(f"Teste '{description}' passou")
        passed = True
    except AssertionError:
        print(f"Teste '{description}' falhou")
        raise
    finally:
        end_time = time.time()
        execution_time = end_time - start_time
        results.append(TestResultData(description, passed, execution_time))
        
@pytest.mark.parametrize("description, a, b, expected", [
    ("teste 1 - 2", 1, 2, -1),
    ("teste 2 - 2", 2, 2, 0),
    ("teste 3 - 2", 3, 2, 1),
])
def test_sub(description, a, b, expected):
    start_time = time.time()
    passed = False
    try:
        assert sub(a, b) == expected
        print(f"Teste '{description}' passou")
        passed = True
    except AssertionError:
        print(f"Teste '{description}' falhou")
        raise
    finally:
        end_time = time.time()
        execution_time = end_time - start_time
        results.append(TestResultData(description, passed, execution_time))
`;

export const defaultTestGo = `package golang

import (
	"fmt"
	"os"
	"testing"
	"time"
)

// Estrutura para armazenar os resultados dos testes
type TestResultData struct {
	description   string
	passed        bool
	executionTime time.Duration
}

// Função para formatar os resultados dos testes
func (result TestResultData) String() string {
	passou := "Falhou"
	if result.passed {
		passou = "Passou"
	}
	// Converte o tempo de execução para segundos com 6 dígitos
	executionTimeSec := float64(result.executionTime.Seconds())
	return fmt.Sprintf(\`"%s",%s,"%.9f"\`, result.description, passou, executionTimeSec)
}

var results []TestResultData

func TestMain(m *testing.M) {
	// Executa os testes
	exitCode := m.Run()

	// Escreve os resultados dos testes em um arquivo
	writeResultsToFile()

	// Finaliza o programa com o código de saída dos testes
	os.Exit(exitCode)
}

// Função para escrever os resultados dos testes em um arquivo
func writeResultsToFile() {
	file, err := os.Create("test_results.txt")
	if err != nil {
		fmt.Println("Erro ao criar arquivo de resultados:", err)
	}
	defer file.Close()

	for _, result := range results {
		_, err := fmt.Fprintf(file, "%s\\n", result)
		if err != nil {
			fmt.Println("Erro ao escrever no arquivo de resultados:", err)
		}
	}

	fmt.Println("Resultados dos testes escritos em 'test_results.txt'.")
}

/*
 Todo os testes devem, por fim, adicionar um resultado na variável results, com a seguinte estrutura:
 results = append(results, TestResultData{
		description:   "Descrição do teste",
		passed:        true/false,
		executionTime: elapsed,
	})
*/

/*
	Para cada função que você deseja testar, você deve criar um teste unitário.
	Para isso, você deve criar uma função com o nome TestNomeDaFuncao, onde NomeDaFuncao é o nome da função que você deseja testar.
	Implemente os testes unitarios abaixo, sem alterar o código acima.
*/

// Teste unitário para a função soma
func TestSoma(t *testing.T) {
	// Dados de entrada
	testCases := []struct {
		description string
		a, b        int
		expected    int
	}{
		{"teste 1 + 2", 1, 2, 3},
		{"teste 2 + 2", 2, 2, 4},
		{"teste 3 + 2", 3, 2, 4},
	}

	// Itera sobre os casos de teste
	for _, tc := range testCases {
		// Marca o início do teste
		start := time.Now()

		// Chama a função que queremos testar
		resultado := Sum(tc.a, tc.b)

		// Marca o fim do teste
		elapsed := time.Since(start)

		// Verifica se a função soma retornou o valor esperado
		passed := resultado == tc.expected
		results = append(results, TestResultData{
			description:   tc.description,
			passed:        passed,
			executionTime: elapsed,
		})
	}
}

// Teste unitário para a função de subtração
func TestSubtracao(t *testing.T) {
	// Dados de entrada
	testCases := []struct {
		description string
		a, b        int
		expected    int
	}{
		{"teste 2 - 1", 2, 1, 1},
		{"teste 2 - 2", 2, 2, 0},
		{"teste 3 - 2", 3, 2, 1},
	}

	// Itera sobre os casos de teste
	for _, tc := range testCases {
		// Marca o início do teste
		start := time.Now()

		// Chama a função que queremos testar
		resultado := Sub(tc.a, tc.b)

		// Marca o fim do teste
		elapsed := time.Since(start)

		// Verifica se a função subtração retornou o valor esperado
		passed := resultado == tc.expected
		results = append(results, TestResultData{
			description:   tc.description,
			passed:        passed,
			executionTime: elapsed,
		})
	}
}
`;