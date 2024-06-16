"use client";
// import Navbar from "@/components/navbar/navbar"; 
import Steps from "@/components/createSteps/createSteps";
import ProblemDetails from "@/components/createProblemDetails/createProblemDetails";
import Applications from "@/components/createApplications/createApplications";
import Languages from "@/components/createLanguages/createLanguages";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import EditorCreate from "@/components/editorCreate/editorCreate";

const CreateChallenge: React.FC = () => {
  const steps = [
    {
      label: 'Challenge Details',
      content: (
        <div>
          <ProblemDetails />
          <Applications />
        </div>
      ),
    },
    { label: 'Languages', content: <Languages /> },
    { label: 'Testcases', content: <EditorCreate />
  },
  ];

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