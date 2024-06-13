import { executionUtils } from '../ExecutionUtils';
import { ILanguageFileNames, ILanguageUtils } from './ILanguageUtils';

class GoLanguageUtils implements ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string) {
        return executionUtils.runShellAndConcatOutputFile(`go test -failfast=false ${filename}`, outputFile);
    }

    getFileNames(): ILanguageFileNames{
        return {
            src: "tempFile.go",
            test: "tempFile_test.go"
        }
    }
}

export const goLanguageUtils = new GoLanguageUtils();