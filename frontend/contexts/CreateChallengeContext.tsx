// context/ChallengeContext.tsx
"use client";
import { IChallenge, IChallengeCreatePayload } from '@/models/IChallenge';
import { defaultTemplateJs } from '@/utils/defaultTemplates';
import { defaultTestJs, defaultTestTs } from '@/utils/defaultTests';
import React, { createContext, useContext, useState } from 'react';


export interface ChallengeContextType {
  challenge: IChallengeCreatePayload;
  setChallenge: (data: IChallengeCreatePayload) => void;
}

interface CreateChallengeProviderProps {
  children: React.ReactNode;
}

const defaultChallenge: IChallengeCreatePayload = {
  title: "Sum challenge",
  description: "Sum test. Your code will receive 2 numbers and must return the sum of them",
  supportedLanguages: ["javascript", "typescript"],
  sourceCodeLanguages: {
    javascript: defaultTestJs,
    typescript: defaultTestTs
  },
  attemptTemplateSourceCodeLanguages: {
    javascript: defaultTemplateJs,
    typescript: defaultTemplateJs
  }
};



const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const useCreateChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallengeContext must be used within a CreateChallengeProvider');
  }
  return context;
};

export const CreateChallengeProvider: React.FC<CreateChallengeProviderProps> = ({ children }) => {
  const [challenge, setChallenge] = useState<IChallengeCreatePayload>(
    defaultChallenge
  );

  return (
    <ChallengeContext.Provider value={{ challenge, setChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};
