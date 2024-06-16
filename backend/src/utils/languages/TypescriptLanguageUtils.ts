import { executionUtils } from '../ExecutionUtils';
import { fileUtils } from '../FileUtilts';
import { ILanguageFileNames, ILanguageUtils } from './ILanguageUtils';

class TypescriptLanguageUtils implements ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string) {
        executionUtils.runShellSync(`jest --testPathPattern=${filename} --no-cache --silent`);

        const result = fileUtils.readFileSync(outputFile);

        return result;
    }

    getFileNames(): ILanguageFileNames{
        return {
            src: "tempFile.ts",
            test: "tempFile.test.ts"
        }
    }
}

export const typescriptLanguageUtils = new TypescriptLanguageUtils();