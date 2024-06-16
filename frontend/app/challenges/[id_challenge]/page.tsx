"use client";

import ButtonUpload from "@/components/buttonUpload/buttonUpload";
import Output from "@/components/output/output";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Table from "@/components/table/table";
import { SetStateAction, useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import { Inspect } from "@/api/api";
import { hexToString } from "viem";
import { usePathname } from "next/navigation";
import { useSetChain, useWallets } from "@web3-onboard/react";
import { getProvider } from "@/utils/getProvider";
import { advanceInput } from "cartesi-client";
import addInput from "@/utils/addInput";

export default function Challenge() {
  const pathname = usePathname().replace("/challenges/", "challenges/");
  const [{ connectedChain }] = useSetChain();
  const [metadata, setMetadata] = useState<any>({});
  const [challenge, setChallenge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [connectedWallet] = useWallets();

  async function fetchData() {
    try {
      const { reports, metadata } = await Inspect(connectedChain, pathname);
      const jsonReport = JSON.parse(hexToString(reports[0].payload));
      setLanguage(jsonReport.supported_languages[0])
      setCode(jsonReport.attempt_template_source_code_languages[jsonReport.supported_languages[0]]);
      console.log(jsonReport);
      setMetadata(metadata);
      setChallenge(jsonReport);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  const handleLanguageChange = (event: { target: { value: SetStateAction<string> } }) => {
    setLanguage(event.target.value);
    setCode(challenge.attempt_template_source_code_languages[event.target.value]);
  };



  async function handleSubmitCode() {

    console.log("Submit Code");
    console.log("Code: ", code);
    const input = {
      method: "application",
      data: {
        challengeId: challenge.id,
        language: language,
        sourceCode: code,
      }
    }
    if (connectedChain) {
      const provider = getProvider(connectedWallet);
      const signer = await provider.getSigner();
      console.log("signer and input is ", signer, input);
      addInput(JSON.stringify(input), provider);
    }

    
  }

  return (
    <main className="flex bg-[#121418] min-h-screen w-full">
      <Navbar />
      <div className="flex w-full pt-24">
        <div className="h-full w-1/3">
          <Table />
        </div>
        <div className="flex flex-col w-2/3 gap-2">
          <div className="h-fit rounded-xl p-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-end px-2 pb-2">
                <select
                  className="text-white bg-[#1C1C1C] rounded-[5px] w-[10vw] h-[5vh] rounded-white justify-end"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value="javascript">Javascript</option>
                  <option value="typescript">Typescript</option>
                  <option value="python">Python</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div className="flex gap-2 w-[1240px] bg-[#1e1e1e] rounded-md">
                <Editor
                  className="mx-1"
                  width={1240}
                  height="40vh" 
                  theme="vs-dark" 
                  language={language}
                  value={code}
                  onChange={(newValue, e) => {
                    setCode(newValue);
                  }}
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
              <button 
                className="font-bold w-[10vw] h-[7vh] text-white rounded-[10px] bg-[#6A0DAD]"
                onClick={handleSubmitCode}
              >
                Submit Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
