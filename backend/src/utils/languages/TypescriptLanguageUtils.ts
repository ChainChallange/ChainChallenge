import { executionUtils } from '../ExecutionUtils';
import { fileUtils } from '../FileUtilts';
import { ILanguageFileNames, ILanguageUtils } from './ILanguageUtils';
import * as path from 'path';

class TypescriptLanguageUtils implements ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string) {
        executionUtils.runShellSync(`jest --testPathPattern=${filename} --silent`);

        return fileUtils.readFileSync(outputFile);
    }

    getFileNames(): ILanguageFileNames{
        return {
            src: "tempFile.ts",
            test: "tempFile.test.ts"
        }
    }
}

export const typescriptLanguageUtils = new TypescriptLanguageUtils();