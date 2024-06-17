import * as fs from 'fs';
import * as path from 'path';

class FileUtils {
    ensureDirectoryExistence(filePath: string) {
        const dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }

        fs.mkdirSync(dirname, {recursive: true});
    }

    fileExists(filename: string): boolean {
        return fs.existsSync(filename);
    }

    writeFileSync(filename: string, content: string, ensureDirectoryExistence: boolean = true) {
        if(ensureDirectoryExistence) {
            this.ensureDirectoryExistence(filename);
        }

        fs.writeFileSync(filename, content);
    }

    removeFolder(folder: string, force: boolean = true) {
        return fs.rmSync(folder, { recursive: true, force })
    }

    removeFilesSync(filenames: string[]) {
        filenames.forEach(filename => {
            if(fs.existsSync(filename)){
                fs.unlinkSync(filename);
            }
        })
    }

    readFileSync(filename: string, encoding: 'utf-8' = 'utf-8') {
        return fs.readFileSync(filename, encoding)
    }

}

export const fileUtils = new FileUtils();