
export interface ILanguageUtils {
    runTestCommandShell(filename: string, outputFile: string): string
    getFileNames(): ILanguageFileNames;
}

export type ILanguageFileNames = {
    src: string;
    test: string;
}