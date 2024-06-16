import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useCreateChallenge } from "@/contexts/CreateChallengeContext";
import { ILanguage } from "@/models/types/ILanguage";
import { defaultTestJs } from "@/utils/defaultTests";

interface Errors {
  [key: string]: string;
}
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { set } from "zod";
import { IChallenge } from "@/models/IChallenge";
import TableResult from "../table/tableResult";
import TableResultItem from "../table/tableResultItem";

export default function DataResult({ challenge }: { challenge: IChallenge }) {
  return (
    <div className="w-full h-full border-[#5C5C5C] border-[3px] rounded-md p-4">
      <TableResult>
        {Object.entries(challenge.applications).map(([index, application]) => (
          <TableResultItem key={index} participant={application}></TableResultItem>
        ))}
      </TableResult>
    </div>
  );
}
