import { executionUtils } from '../ExecutionUtils';
import { fileUtils } from '../FileUtilts';
import { ILanguageFileNames, ILanguageUtils } from './ILanguageUtils';

class JavascriptLanguageUtils implements ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string) {
        executionUtils.runShellSync(`jest --testPathPattern=${filename} --no-cache --silent`);

        const result = fileUtils.readFileSync(outputFile);

        return result;
    }

    getFileNames(): ILanguageFileNames{
        return {
            src: "tempFile.js",
            test: "tempFile.test.js"
        }
    }
}

export const javascriptLanguageUtils = new JavascriptLanguageUtils();