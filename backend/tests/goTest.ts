import { applicationExecutionService } from "../src/services/ApplicationExecutionService";
import { challengeExecutionService } from "../src/services/ChallengeExecutionService";

const goCode = `package outputs

// Add is our function that sums two integers
func Sum(x, y int) (res int) {
	return x + y
}

func Sub(x, y int) (res int) {
	return x - y
}
`;

const testGoCode = `package outputs

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
	return fmt.Sprintf(` + '`"%s",%s,"%.9f"`' + `, result.description, passou, executionTimeSec)
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
}`;

const challenge = challengeExecutionService.createChallengeAndGetTests({
  wallet: 'wallet criador aqui',
  title: 'Título aqui',
  description: 'Descrição aqui',
  difficulty: 'hard',
  category: 'js',
  sourceCodeLanguages: {
    go: testGoCode
  },
  attemptTemplateSourceCodeLanguages: {
    go: goCode,
  },
  supportedLanguages: ['go'],
})

console.log('Challenge Criado: ', challenge);


const application = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'go', goCode);
console.log('Aplicação Criada: ', application);