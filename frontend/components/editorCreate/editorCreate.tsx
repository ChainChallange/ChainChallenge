import { Editor } from "@monaco-editor/react";
import { SetStateAction, useState } from "react";

export default function EditorCreate() {
  const [select, setSelect] = useState("javascript");
  const handleLanguageChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelect(event.target.value);
  };

  return (
    <div className="w-full h-full border-[#5C5C5C] border-[3px] rounded-md">
      <div className="flex flex-col gap-2 px-4">
        <div className="flex px-2 pb-2 w-full justify-center items-center  pt-4">
          <div className="w-1/2">
            <h1 className="text-white font-bold text-[24px]">Testcases</h1>
          </div>
          <div className="flex justify-end w-1/2">
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
        </div>
        <div className="flex flex-col gap-2 bg-[#1E1E1E] rounded-md">
          <Editor height="50vh" theme="vs-dark" language={select} />
        </div>
      </div>
    </div>
  );
}
