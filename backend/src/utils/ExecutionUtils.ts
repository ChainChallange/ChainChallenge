import { execSync } from 'child_process';
import { fileUtils } from "./FileUtilts";
import { TestResult } from '../models/types/ITestResult';
import { ILanguage } from '../models/types/ILanguage';
import { ISourceCode } from '../models/types/ISourceCode';
import { writeFileSync } from 'fs';
import { languageUtils } from './languages/LanguageUtils';
import { environmentVars } from '../config/Environment';

class ExecutionUtils {
    createAndRun(language: ILanguage, src: ISourceCode, testSrc: ISourceCode, outDir = `${__dirname}${environmentVars.OUTPUTS_PATH}`){
        fileUtils.writeFileSync(`${outDir}test_results.txt`, '');

        const languageUtilClass = languageUtils.getLanguageUtilsClass(language);
        const languageFileNames = languageUtilClass.getFileNames();

        writeFileSync(`${outDir}${languageFileNames.src}`, src);
        writeFileSync(`${outDir}${languageFileNames.test}`, testSrc);

        const dateStarted = new Date();
        console.log(`[${dateStarted.toISOString()}] TESTING ${language}.......`)

        let results = null;
        try {
            results = languageUtilClass.runTestCommandShell(`./outputs/`, `${outDir}test_results.txt`)
        } catch (error) {
            console.log(`[${new Date().toISOString()}] ERROR TESTING`)
            // console.log(error);
        }
        
        const dateFinished = new Date();
        console.log(`[${dateFinished.toISOString()}] TESTED ${language}....... ${dateFinished.getTime() - dateStarted.getTime()}ms`);
        
        fileUtils.removeFolder(outDir);
        
        return results ? this.testOutputToTestResult(results) : [];
    }

    runShellAndConcatOutputFile(shell: string, filename: string) {
        let output = '';

        if (fileUtils.fileExists(filename)) {
            output = fileUtils.readFileSync(filename);
        }

        output += '\n'

        const comandoOutput = this.runShellSync(shell);

        console.log('command output', comandoOutput);

        output += (comandoOutput);

        fileUtils.writeFileSync(filename, output);

        return output;
    }

    runShellSync(shell: string) {
        return execSync(shell, { encoding: 'utf-8' }).toString();
    }

    testOutputToTestResult(output: string): TestResult[] {
        let resultsArray: TestResult[] = [];
        const lines = output.split('\n');
        lines.forEach(line => {

            if (line.trim() !== '') {
            const [test, result, time] = line.replace(/"/g, '').split(',');

            let resultBoolean = false;
            if (result === 'Passou') {
                resultBoolean = true;
            }

            resultsArray.push({ name: test, result: resultBoolean, time: parseFloat(time) });
            }
        });
        return resultsArray;
    }
}

export const executionUtils = new ExecutionUtils();