import { executionUtils } from '../ExecutionUtils';
import { fileUtils } from '../FileUtilts';
import { ILanguageFileNames, ILanguageUtils } from './ILanguageUtils';

class GoLanguageUtils implements ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string) {
        fileUtils.writeFileSync(`${filename}go.mod`, `module chainchallenge
        go 1.23`)

        executionUtils.runShellSync(`cd ${filename} && go test -failfast=false`);

        return fileUtils.readFileSync(outputFile);
    }

    getFileNames(): ILanguageFileNames{
        return {
            src: "tempFile.go",
            test: "tempFile_test.go"
        }
    }
}

export const goLanguageUtils = new GoLanguageUtils();