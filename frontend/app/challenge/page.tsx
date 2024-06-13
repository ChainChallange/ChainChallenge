"use client";

import ButtonUpload from "@/components/buttonUpload/buttonUpload";
import Output from "@/components/output/output";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Table from "@/components/table/table";
import { SetStateAction, useState } from "react";
import Navbar from "@/components/navbar/navbar";

export default function Challenge() {
  const [select, setSelect] = useState("javascript");

  const handleLanguageChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelect(event.target.value);
  };

  return (
    <main className="flex bg-[#121418] min-h-screen w-full">
      <Navbar />
      <div className="flex w-full pt-32">
        <div className="h-full w-1/3">
          <Table />
        </div>
        <div className="flex flex-col w-2/3 gap-2">
          <div className="h-fit rounded-xl p-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-end px-2 pb-2">
                <select
                  className="text-white bg-[#1C1C1C] rounded-[5px] w-[10vw] h-[5vh] rounded-white justify-end"
                  value={select}
                  onChange={handleLanguageChange}
                >
                  <option value="javascript">Javascript</option>
                  <option value="typescript">Typescript</option>
                  <option value="python">Python</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 bg-[#1E1E1E] rounded-md">
                <Editor
                  height="40vh"
                  theme="vs-dark"
                  language={select}
                />
              </div>
                <Output />
            </div>
          </div>
          <div className="flex px-5">
            <div className="flex flex-row w-1/2 gap-4">
              <ButtonUpload />
              <button className="flex items-center font-bold justify-center bg-[#19141D] text-white w-[8vw] h-[7vh] rounded-[10px] hover:bg-gray-700 border-[2px] border-[#6A0DAD]">
                Run Code
              </button>
            </div>
            <div className="flex justify-end w-1/2">
              <button className="font-bold w-[10vw] h-[7vh] text-white rounded-[10px] bg-[#6A0DAD]">
                Submit Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
