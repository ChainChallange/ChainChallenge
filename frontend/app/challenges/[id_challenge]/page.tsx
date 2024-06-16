"use client";

import ButtonUpload from "@/components/buttonUpload/buttonUpload";
import Editor from "@monaco-editor/react";
import Table from "@/components/table/table";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import { Inspect } from "@/api/api";
import { hexToString, stringToBytes } from "viem";
import { usePathname } from "next/navigation";
import { useSetChain, useWallets } from "@web3-onboard/react";
import { getProvider } from "@/utils/getProvider";
import addInput from "@/utils/addInput";
import { base64 } from "ethers/lib/utils";
import { IChallenge } from "@/models/IChallenge";
import { toast, Bounce } from "react-toastify";

interface ILanguageSourceCodeObj {
  [key: string]: string;
}


export default function Challenge() {
  const pathname = usePathname().replace("/challenges/", "challenges/");
  const [{ connectedChain }] = useSetChain();
  const [metadata, setMetadata] = useState<any>({});
  const [challenge, setChallenge] = useState<IChallenge>();
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState<string>("");
  const [connectedWallet] = useWallets();


  useEffect(() => {
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
    fetchData();
  }, [connectedChain, loading, pathname]);

  if (!challenge) {
    return <div>Loading...</div>
  } else {

    const handleLanguageChange = (event: { target: { value: string } }) => {
      const selectedLanguage = event.target.value;
      setLanguage(selectedLanguage);
      setCode((challenge!.attempt_template_source_code_languages as { [key: string]: string })[selectedLanguage]);
      setLoading(true);
    };

    const handleCodeChange = (newValue: any) => {
      setCode(newValue);
    }

    const handleSubmitCode = async () => {
      if (!connectedChain || !connectedWallet) {
        toast.error('Connect your wallet to submit one attempt', {
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });      
      } else {
        console.log("Submit Code");
        console.log("Code: ", code);
        const input = {
          method: "application",
          data: {
            challengeId: challenge.id,
            language: language,
            sourceCode: base64.encode(stringToBytes(code)),
          }
        }
        const provider = getProvider(connectedWallet);
        const signer = await provider.getSigner();
        console.log("signer and input is ", signer, input);
        addInput(JSON.stringify(input), provider);
        toast('Submitting attempt...', {
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }

    console.log("Challenge: ", challenge);

    return (
      <main className="flex bg-[#121418] min-h-screen w-full">
        <Navbar />
        <div className="flex w-full pt-24">
          <div className="h-full w-1/3">
            <Table
              id={challenge.id}
              wallet_of_creator={challenge.wallet_of_creator}
              title={challenge.title}
              description={challenge.description}
              image_link={challenge.image_link}
              category={challenge.category}
              difficulty={challenge.difficulty}
              creation_date={challenge.creation_date}
              start_date={challenge.start_date}
              end_date={challenge.end_date}
              max_applications_attempts={challenge.max_applications}
              max_applications={challenge.max_applications}
              wallet_of_applicants_only={challenge.wallet_of_applicants_only}
              supported_languages={challenge.supported_languages}
              min_passed_tests_to_complete={challenge.min_passed_tests_to_complete}
              source_code_languages={challenge.source_code_languages}
              attempt_template_source_code_languages={challenge.attempt_template_source_code_languages}
              quantity_of_tests={challenge.quantity_of_tests} tests={challenge.tests}
              quantity_of_applications={challenge.quantity_of_applications}
              quantity_of_applications_accepted={challenge.quantity_of_applications_accepted}
              quantity_of_applications_rejected={challenge.quantity_of_applications_rejected}
              applications={challenge.applications}
              applications_accepted_ranking={challenge.applications_accepted_ranking}
            />
          </div>
          <div className="flex flex-col w-2/3 gap-2">
            <div className="h-fit rounded-xl p-5">
              <div className="flex flex-col gap-2 h-[75vh]">
                <div className="flex justify-end px-2 pb-2">
                  <select
                    className="text-white bg-[#1C1C1C] rounded-[5px] w-[10vw] h-[5vh] rounded-white justify-end"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    {challenge.supported_languages.map(language => (
                      <option key={language} value={language}>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 bg-[#1e1e1e] rounded-md h-full w-full">
                  <Editor
                    className="mx-1"
                    width="100%"
                    height="100%"
                    theme="vs-dark"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                  />
                </div>
                {/* <Output /> */}
              </div>
            </div>
            <div className="flex px-5">
              <div className="flex flex-row w-1/2 gap-4">
                <ButtonUpload />
                {/* <button className="flex items-center font-bold justify-center bg-[#19141D] text-white w-[8vw] h-[7vh] rounded-[10px] hover:bg-gray-700 border-[2px] border-[#6A0DAD]">
                Run Code
              </button> */}
              </div>
              <div className="flex justify-end w-1/2 pr-24">
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

}
