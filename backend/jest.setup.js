const fs = require('fs');
const path = require('path');

class TestResultData {
  constructor(description, passed, executionTime) {
    this.description = description;
    this.passed = passed;
    this.executionTime = executionTime;
  }

  toString() {
    return `"${this.description}",${this.passed ? '"Passou"' : '"Falhou"'},"${this.executionTime}"`;
  }
}

const results = [];

global.beforeAll(() => {
});

global.afterAll(() => {
  destroy();
});

function destroy(saveInfos = false) {
  const filePath = path.resolve(`${__dirname}/outputs/`, 'test_results.txt');
  fs.writeFileSync(filePath, results.map(result => result.toString()).join('\n'));
}

global.results = results;
global.TestResultData = TestResultData;