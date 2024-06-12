import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { TbClipboardCopy } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";

interface ShowCodeProps {
  code: string;
}

const ShowCode: React.FC<ShowCodeProps> = ({ code }) => {
  const [copy, setCopy] = useState(false);
  const lines = code.split('\n');
  
  return (
    <div className="bg-[#1C1C1C] grid place-items-center h-[500px] w-full">
      <div className="max-w-2xl w-full h-[500px] bg-[#1C1C1C] rounded-md overflow-hidden">
        <div className="flex justify-end px-4 text-white text-[18px] font-bold text-xs items-center h-[50px] bg-[#1C1C1C]">
          <div className="flex flex-row">
            <p className="">Language</p>
            <select className="ml-4 bg-[#1C1C1C] border rounded-[5px]" value="go">
              <option value="go">Go</option>
              <option value="javascript">Javascript</option>
              <option value="typescript">Typescript</option>
            </select>
          </div>
          {copy ? (
            <button className="py-1 inline-flex items-center gap-1">
              <FaCheck className="checkmark-sharp" />
              Copied!
            </button>
          ) : (
            <button
              className="py-1 inline-flex items-center gap-1"
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 3000);
              }}
            >
              <TbClipboardCopy className="w-6 h-6" />
              Copy code
            </button>
          )}
        </div>
        <div className="flex bg-[#1C1C1C] h-[calc(100%-50px)]">
          <div className="flex-shrink-0 text-right pr-2 text-gray-500">
            {lines.map((_, i) => (
              <div key={i} style={{ lineHeight: '1.5em' }}>{i + 1}</div>
            ))}
          </div>
          <div className="flex-grow overflow-auto">
            <SyntaxHighlighter
              language="python"
              style={atomOneDark}
              customStyle={{
                background: "#1C1C1C",
                padding: "25px",
                minHeight: "100%",
                maxHeight: "calc(100% - 50px)",
                overflow: "auto",
              }}
              wrapLongLines={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCode;
