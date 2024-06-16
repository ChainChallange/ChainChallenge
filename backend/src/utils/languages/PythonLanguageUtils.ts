import { executionUtils } from '../ExecutionUtils';
import { fileUtils } from '../FileUtilts';
import { ILanguageFileNames, ILanguageUtils } from './ILanguageUtils';

class PythonLanguageUtils implements ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string) {
        executionUtils.runShellSync(`PYTHONDONTWRITEBYTECODE=1 python3 ${filename}${this.getFileNames().test}`);
        return fileUtils.readFileSync(outputFile);
    }

    getFileNames(): ILanguageFileNames {
        return {
            src: "tempFile.py",
            test: "test_tempFile_python.py"
        }
    }
}

export const pythonLanguageUtils = new PythonLanguageUtils();