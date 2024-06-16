"use client";

import React, { useState } from 'react';

const Applications: React.FC = () => {
  const [whitelist, setWhitelist] = useState<string[]>(['']);

  const handleWhitelistChange = (index: number, value: string) => {
    const newWhitelist = [...whitelist];
    newWhitelist[index] = value;
    setWhitelist(newWhitelist);
  };

  const handleWhitelistKeyPress = (index: number, value: string) => {
    if (index === whitelist.length - 1 && value.trim() !== '') {
      setWhitelist([...whitelist, '']);
    }
  };

  const handleWhitelistRemove = (index: number) => {
    if (whitelist.length > 1) {
      const newWhitelist = whitelist.filter((_, i) => i !== index);
      setWhitelist(newWhitelist);
    }
  };

  return (
    <div className="applications p-6 bg-[#121418] rounded-lg shadow-md border-[1px] border-[#5C5C5C] border-opacity-50 mt-6">
      <h2 className="text-2xl mb-6">Applications</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="w-[178px]">
          <label className="block text-sm font-medium text-gray-300">Max Applications</label>
          <input
            type="text"
            className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            placeholder="Placeholder"
          />
        </div>
        <div className="w-[178px]">
          <label className="block text-sm font-medium text-gray-300">Max Attempts</label>
          <input
            type="text"
            className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            placeholder="Placeholder"
          />
        </div>
        <div className="w-[178px]">
          <label className="block text-sm font-medium text-gray-300">Min tests to complete</label>
          <input
            type="text"
            className="mt-1 block w-full h-[42px] rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            placeholder="Placeholder"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Whitelist</label>
        {whitelist.map((address, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-700 bg-white bg-opacity-5 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              placeholder="0x000...000"
              value={address}
              onChange={(e) => handleWhitelistChange(index, e.target.value)}
              onKeyPress={(e) => handleWhitelistKeyPress(index, e.currentTarget.value + e.key)}
            />
            {whitelist.length > 1 && (
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleWhitelistRemove(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
