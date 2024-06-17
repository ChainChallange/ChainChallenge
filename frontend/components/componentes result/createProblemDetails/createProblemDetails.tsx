"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { useCreateChallenge } from "@/contexts/CreateChallengeContext";
import { IChallenge } from "@/models/IChallenge";

const ProblemDetailsResult = ({ challenge }: { challenge: IChallenge }) => {
  if (challenge != null) {
    return (
      <div className="problem-details p-6 bg-[#121418] rounded-lg shadow-md border-[1px] border-[#5C5C5C] border-opacity-50">
        <h2 className="text-2xl mb-6">Problem Details</h2>
        <div className="flex justify-between space-x-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300">
              Challenge Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              value={challenge.title}
              placeholder="Enter challenge name"
            />
          </div>
          <div className="w-[172px]">
            <label className="block text-sm font-medium text-gray-300">Difficulty</label>
            <Select.Root value={challenge.difficulty != null ? challenge.difficulty : ""}>
              <Select.Trigger className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white text-opacity-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3">
                <Select.Value placeholder="Select difficulty" />
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
            <Select.Root value={challenge.category != null ? challenge.category : ""}>
              <Select.Trigger className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white text-opacity-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3">
                <Select.Value
                  placeholder="Select category"
                  className="text-white text-opacity-80"
                />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content position="popper">
                  <Select.Viewport className="bg-white bg-opacity-30 text-white rounded-md shadow-lg">
                    <Select.Item value="IA" className="px-4 py-2 hover:bg-gray-700">
                      <Select.ItemText>IA</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="algorithms"
                      className="px-4 py-2 hover:bg-gray-700"
                    >
                      <Select.ItemText>Algorithms</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="data-structures"
                      className="px-4 py-2 hover:bg-gray-700"
                    >
                      <Select.ItemText>Data Structures</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="web-development"
                      className="px-4 py-2 hover:bg-gray-700"
                    >
                      <Select.ItemText>Web Development</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Challenge Description
          </label>
          <textarea
            rows={8}
            className="mt-1 block w-full rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            placeholder="Describe the challenge"
            value={challenge.description != null ? challenge.description : ""}
          />
        </div>
      </div>
    );
  }
};

export default ProblemDetailsResult;
