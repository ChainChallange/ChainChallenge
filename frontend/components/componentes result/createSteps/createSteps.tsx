"use client";

import { useState, ReactNode } from 'react';
import ButtonCustom from '../../button/buttonCustom';
import { useCreateChallenge } from '@/contexts/CreateChallengeContext';

interface Step {
  label: string;
  content: ReactNode;
}

interface StepsProps {
  steps: Step[];
}

const StepsResult: React.FC<StepsProps> = ({ steps }) => {
  const { challenge } = useCreateChallenge();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="steps-container flex">
      <div className="steps-sidebar w-1/4 p-4">
        {steps.map((step, index) => (
          <div key={index} className="step mb-4 flex items-start relative">
            {index === currentStep && (
              <div className="absolute left-0 h-full border-l-4 border-purple-800 -ml-4"></div>
            )}
            <div className="flex flex-col items-center mr-4 z-10">
              <div
                className={`circle w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  index === currentStep ? 'border-purple-500' : 'border-gray-500'
                }`}
              >
                <span
                  className={`text-lg ${
                    index === currentStep ? 'text-purple-500' : 'text-white'
                  }`}
                >
                  {index + 1}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`line h-full border-l-2 ${index === currentStep ? 'border-purple-500' : 'border-gray-500'}`}></div>
              )}
            </div>
            <div>
              <div className={`text-xs text-white`}>
                Step {index + 1}
              </div>
              <div className={`sl-1 ${index === currentStep ? 'font-bold text-purple-500' : 'font-normal text-white'}`}>
                {step.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="steps-content w-3/4 p-4">
        {steps[currentStep].content}
        <div className="steps-navigation mt-4 flex justify-end">
          {currentStep > 0 && (
            <ButtonCustom onClick={prevStep} className="btn-prev bg-gray-500 text-white py-2 px-4 mr-2">
              Previous
            </ButtonCustom>
          )}
          {currentStep < steps.length - 1 ? (
            <ButtonCustom onClick={nextStep} className="btn-next bg-primary text-white py-2 px-4"
            >
              Next
            </ButtonCustom>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepsResult;
