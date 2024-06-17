"use client";

import React from 'react';
import * as Select from '@radix-ui/react-select';
import { useCreateChallenge } from '@/contexts/CreateChallengeContext';

const ProblemDetails: React.FC = () => {
  const { challenge, setChallenge } = useCreateChallenge();
  console.log(challenge);

  function handleChallengeNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setChallenge({ ...challenge, title: event.target.value });
  }

  function handleDifficultyChange(value: string) {
    console.log(value);
    setChallenge({ ...challenge, difficulty: value });
  }

  function handleCategoryChange(value: string) {
    console.log(value);
    setChallenge({ ...challenge, category: value });
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(event.target.value);
    setChallenge({ ...challenge, description: event.target.value });
  }

  return (
    <div className="problem-details p-6 bg-[#121418] rounded-lg shadow-md border-[1px] border-[#5C5C5C] border-opacity-50">
      <h2 className="text-2xl mb-6">Problem Details</h2>
      <div className="flex justify-between space-x-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300">Challenge Name</label>
          <input
            type="text"
            className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            value={challenge.title}
            onChange={handleChallengeNameChange}
            placeholder="Enter challenge name"
          />
        </div>
        <div className="w-[172px]">
          <label className="block text-sm font-medium text-gray-300">Difficulty</label>
          <Select.Root 
            defaultValue={challenge.difficulty} 
            onValueChange={handleDifficultyChange}
          >
          <Select.Trigger className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white text-opacity-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3">
          <Select.Value placeholder="Select difficulty"/>
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
            <Select.Content position="popper">
              <Select.Viewport className="bg-white bg-opacity-30 text-white rounded-md shadow-lg">
                <Select.Item value="easy" className="px-4 py-2 hover:bg-gray-700">
                  <Select.ItemText>Easy</Select.ItemText>
                </Select.Item>
                <Select.Item value="medium" className="px-4 py-2 hover:bg-gray-700">
                  <Select.ItemText>Medium</Select.ItemText>
                </Select.Item>
                <Select.Item value="hard" className="px-4 py-2 hover:bg-gray-700">
                  <Select.ItemText>Hard</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <div className="w-[172px]">
          <label className="block text-sm font-medium text-gray-300">Category</label>
          <Select.Root 
            defaultValue={challenge.category}
            onValueChange={handleCategoryChange}
          >
          <Select.Trigger className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white text-opacity-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3">
          <Select.Value placeholder="Select category" className="text-white text-opacity-80" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
            <Select.Content position="popper">
            <Select.Viewport className="bg-white bg-opacity-30 text-white rounded-md shadow-lg">
            <Select.Item value="IA" className="px-4 py-2 hover:bg-gray-700">
                  <Select.ItemText>IA</Select.ItemText>
                </Select.Item>
                <Select.Item value="algorithms" className="px-4 py-2 hover:bg-gray-700">
                  <Select.ItemText>Algorithms</Select.ItemText>
                </Select.Item>
                <Select.Item value="data-structures" className="px-4 py-2 hover:bg-gray-700">
                  <Select.ItemText>Data Structures</Select.ItemText>
                </Select.Item>
                <Select.Item value="web-development" className="px-4 py-2 hover:bg-gray-700">
                  <Select.ItemText>Web Development</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
            </Select.Portal>

          </Select.Root>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Challenge Description</label>
        <textarea
          rows={8}
          className="mt-1 block w-full rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
          placeholder="Describe the challenge"
          defaultValue={challenge.description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default ProblemDetails;
