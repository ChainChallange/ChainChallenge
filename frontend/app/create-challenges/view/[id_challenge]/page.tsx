"use client";
// import Navbar from "@/components/navbar/navbar";
import Steps from "@/components/createSteps/createSteps";
import ProblemDetails from "@/components/createProblemDetails/createProblemDetails";
import Applications from "@/components/createApplications/createApplications";
import Languages from "@/components/createLanguages/createLanguages";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import EditorCreate from "@/components/editorCreate/editorCreate";
import ProblemDetailsResult from "@/components/componentes result/createProblemDetails/createProblemDetails";
import ApplicationsResult from "@/components/componentes result/createApplications/createApplications";
import LanguagesResult from "@/components/componentes result/createLanguages/createLanguages";
import EditorCreateResult from "@/components/componentes result/editorCreate/editorCreate";
import { IChallenge } from "@/models/IChallenge";
import React, { useEffect, useState } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { hexToString } from "@/utils/hexToString";
import { Inspect } from "@/api/api";
import { usePathname } from "next/navigation";
import DataResult from "@/components/componentes result/results/results";

const CreateChallenge: React.FC = () => {
  const pathname = usePathname().replace("/create-challenges/view/", "challenges/");
  const [challenge, setChallenge] = useState<IChallenge>({} as IChallenge);
  const [loading, setLoading] = useState<boolean>(true);
  const [{ connectedChain }] = useSetChain();
  const [metadata, setMetadata] = useState<any>({});
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const steps = [
    {
      label: "Challenge Details",
      content: (
        <div>
          <ProblemDetailsResult challenge={challenge} />
          <ApplicationsResult  challenge={challenge}/>
        </div>
      ),
    },
    { label: "Languages", content: <LanguagesResult challenge={challenge}/> },
    { label: "Testcases", content: <EditorCreateResult challenge={challenge}/> },
    { label: "Results", content: <DataResult challenge={challenge}/> },
  ];

  async function fetchChallenge() {
    try {
      if (!connectedChain) {
        //alert("Please connect to a network");
      } else {
        const { reports, metadata } = await Inspect(connectedChain, pathname);
        setMetadata(metadata);
        setChallenge(JSON.parse(hexToString(reports[0].payload)));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchChallenge();
  }, [wallet]);

  return (
    <div className="create-challenge-page bg-[#121418] min-h-screen text-white pt-[100px]">
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        <Steps steps={steps} />
      </div>
    </div>
  );
};

export default CreateChallenge;
