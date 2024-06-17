import { IExtension, ILanguage } from '../../models/types/ILanguage';
import { goLanguageUtils } from './GoLanguageUtils';
import { ILanguageUtils } from './ILanguageUtils';
import { javascriptLanguageUtils } from './JavascriptLanguageUtils';
import { pythonLanguageUtils } from './PythonLanguageUtils';
import { typescriptLanguageUtils } from './TypescriptLanguageUtils';

class LanguageUtils {
    convertLanguageToExtension(language: ILanguage): IExtension {
        switch(language){
          case 'go':
            return 'go';
            break;
          case 'javascript':
            return 'js';
            break;
          case 'typescript':
              return 'ts';
              break;
          case 'python':
            return 'py';
            break;
          default:
            throw new Error('Language or Extension dont supported')
        }
      }

      convertExtensionToLanguage(extension: IExtension): ILanguage {
        switch(extension){
          case 'go':
            return 'go';
            break;
          case 'js':
            return 'javascript';
            break;
          case 'ts':
              return 'typescript';
              break;
          case 'py':
            return 'python';
            break;
          default:
            throw new Error('Language or Extension dont supported')
        }
      }

      getLanguageUtilsClass(language:ILanguage): ILanguageUtils {
        switch(language){
          case 'go':
            return goLanguageUtils
            break;
          case 'javascript':
            return javascriptLanguageUtils
            break;
          case 'typescript':
            return typescriptLanguageUtils
            break;
          case 'python':
            return pythonLanguageUtils
            break;
          default:
            throw new Error('Language or Extension dont supported')
      }
    }
    
}

export const languageUtils = new LanguageUtils();