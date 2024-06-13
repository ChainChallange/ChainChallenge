import { executionUtils } from '../ExecutionUtils';
import { fileUtils } from '../FileUtilts';
import { ILanguageFileNames, ILanguageUtils } from './ILanguageUtils';
import * as path from 'path';

class JavascriptLanguageUtils implements ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string) {
        executionUtils.runShellSync(`jest --testPathPattern=${filename} --silent`);

        return fileUtils.readFileSync(outputFile);
    }

    getFileNames(): ILanguageFileNames{
        return {
            src: "tempFile.js",
            test: "tempFile.test.js"
        }
    }
}

export const javascriptLanguageUtils = new JavascriptLanguageUtils();