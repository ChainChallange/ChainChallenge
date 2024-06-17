"use client";

import React, { useState, useEffect } from 'react';
import { ILanguage } from '@/models/types/ILanguage';
import { IChallenge } from '@/models/IChallenge';

const LanguagesResult = ({ challenge }: { challenge: IChallenge }) => {
  const languages: { name: ILanguage | string, disabled: boolean }[] = [
    { name: 'Python', disabled: false },
    { name: 'JavaScript', disabled: false },
    { name: 'TypeScript', disabled: false },
    { name: 'Go', disabled: false },
    { name: 'C++', disabled: true },
    { name: 'Java', disabled: true },
    { name: 'Kotlin', disabled: true },
    { name: 'Clojure', disabled: true },
    { name: 'Perl', disabled: true },
    { name: 'Rust', disabled: true },
    { name: 'Haskell', disabled: true },
    { name: 'Lua', disabled: true },
    { name: 'Scala', disabled: true },
    { name: 'R', disabled: true },
    { name: 'PyPy', disabled: true },
    { name: 'PHP', disabled: true },
    { name: 'C++20', disabled: true },
    { name: 'Swift', disabled: true },
    { name: 'Objective-C', disabled: true },
    { name: 'Erlang', disabled: true },
    { name: 'Java 8', disabled: true },
    { name: 'Java 17', disabled: true },
    { name: 'C#', disabled: true },
  ];


  const [selectedLanguages, setSelectedLanguages] = useState<ILanguage[]>(challenge.supported_languages || []);

  useEffect(() => {
    setSelectedLanguages(challenge.supported_languages || []);
    //setChallenge({ ...challenge, supportedLanguages: selectedLanguages });
  }, [challenge.supported_languages, selectedLanguages]);

  function handleLanguageChange(language: string) {
    language = language.toLowerCase();
    if (isILanguage(language)) {
      setSelectedLanguages((prevSelected) =>
        prevSelected.includes(language as ILanguage)
          ? prevSelected.filter((lang) => lang !== language)
          : [...prevSelected, language as ILanguage]
      );
    }
  }

  function isILanguage(language: ILanguage | string): language is ILanguage {
    return ['javascript', 'typescript', 'python', 'go'].includes(language.toLowerCase());
  }

  return (
    <div className="languages p-6 bg-[#121418] rounded-lg shadow-md border-[1px] border-[#5C5C5C] border-opacity-50">
      <h2 className="text-2xl mb-4">Languages</h2>
      <p className="mb-4 text-gray-400">Candidates will have an option to solve this question in the selected languages.</p>
      <div className="grid grid-cols-3 gap-4">
        {languages.map((language, index) => (
          <label key={index} className={`flex items-center ${language.disabled ? 'text-gray-600' : 'text-white'}`}>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600 bg-white bg-opacity-24 border-gray-700"
              onChange={() => handleLanguageChange(language.name)}
              checked={selectedLanguages.includes(language.name.toLowerCase() as ILanguage)}
              disabled={language.disabled}
            />
            <span className="ml-2">{language.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LanguagesResult;
