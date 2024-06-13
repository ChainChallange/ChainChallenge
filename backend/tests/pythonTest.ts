import { applicationExecutionService } from "../src/services/ApplicationExecutionService";
import { challengeExecutionService } from "../src/services/ChallengeExecutionService";

const pyCode = `
def sum(a, b):
  return a + b

def sub(a, b):
  return a - b
`;

const testPyCode = `
import pytest
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
            file.write(str(result) + ` + "'\\n'" + `)
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

const challenge = challengeExecutionService.createChallengeAndGetTests({
  wallet: 'wallet criador aqui',
  title: 'Título aqui',
  description: 'Descrição aqui',
  difficulty: 'hard',
  category: 'js',
  sourceCodeLanguages: {
    python: testPyCode
  },
  attemptTemplateSourceCodeLanguages: {
    python: pyCode,
  },
  supportedLanguages: ['python'],
})

console.log('Challenge Criado: ', challenge);


const application = applicationExecutionService.runChallengeAttemptAndSave('Wallet aplicante aqui', challenge.id, 'python', pyCode);
console.log('Aplicação Criada: ', application);