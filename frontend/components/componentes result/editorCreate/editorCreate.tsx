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

export default function EditorCreateResult({ challenge }: { challenge: IChallenge }) {
  const [tabSelected, setTabSelected] = useState("1");
  const [select, setSelect] = useState<ILanguage>(
    challenge.supported_languages[0] || "javascript"
  );
  const [allTestsCreated, setAllTestsCreated] = useState(false);
  const [errors, setErrors] = useState<{ [key in ILanguage]?: string }>({});

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value as ILanguage;
    setSelect(selectedLanguage);
  };

  const checkAllTestsCreated = () => {
    const { supported_languages, source_code_languages } = challenge;
    const errors: { [key in ILanguage]?: string } = {};

    supported_languages.forEach((language) => {
      console.log(language);
      const template = challenge.attempt_template_source_code_languages[language];
      const srcTest = challenge.source_code_languages[language];
      if (!template || template.length < 10) {
        errors[language] = `Template for ${language} is missing or too short.`;
      }
      if (!srcTest || srcTest.length < 301) {
        errors[language] = `Test for ${language} is missing or too short.`;
      }
    });

    return {
      allCreated: Object.keys(errors).length === 0,
      errors: errors,
    };
  };

  const handleTab = (value: string) => {
    setTabSelected(value);
  };

  useEffect(() => {
    const { allCreated, errors } = checkAllTestsCreated();
    setAllTestsCreated(allCreated);
    setErrors(errors);
  }, [challenge]);

  return (
    <div className="w-full h-full border-[#5C5C5C] border-[3px] rounded-md p-4">
      <TabContext value={tabSelected}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={() => {
              handleTab(tabSelected === "1" ? "2" : "1");
            }}
            aria-label="lab API tabs example"
          >
            <Tab
              label="Teste Cases"
              value="1"
              sx={{ color: "#5C5C5C", borderBottom: 5, borderColor: "divider" }}
            />
            <Tab label="Code Template" value="2" sx={{ color: "#5C5C5C" }} />
          </TabList>
        </Box>

        {/* Teste cases */}
        <TabPanel value="1">
          <div className="flex flex-col gap-2 px-2">
            <div className="flex px-2 pb-2 w-full justify-center items-center pt-4">
              <div className="w-1/2">
                <h1 className="text-white font-bold text-[24px]">Testcases</h1>
              </div>
              <div className="flex justify-end w-1/2">
                <select
                  className="text-white bg-[#1C1C1C] rounded-[5px] w-[10vw] h-[5vh] justify-end"
                  value={select}
                  onChange={handleLanguageChange}
                >
                  {challenge.supported_languages.map((language) => (
                    <option key={language} value={language}>
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-[#1E1E1E] rounded-md">
              <Editor
                height="50vh"
                theme="vs-dark"
                language={select}
                keepCurrentModel
                
                value={challenge.source_code_languages[select] || ""}
              />
            </div>
            <div className="pt-4">
              {allTestsCreated ? (
                <p className="text-green-500">
                  All tests are created for selected languages.
                </p>
              ) : (
                <div>
                  <p className="text-red-500">
                    Some tests are missing for selected languages:
                  </p>
                  <ul className="text-red-500">
                    {Object.keys(errors).map((language) => (
                      <li key={language}>{errors[language]}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </TabPanel>

        {/* Template code */}
        <TabPanel value="2">
          <div className="flex flex-col gap-2 px-2">
            <div className="flex px-2 pb-2 w-full justify-center items-center  pt-4">
              <div className="w-1/2">
                <h1 className="text-white font-bold text-[24px]">Code Template</h1>
              </div>
              <div className="flex justify-end w-1/2">
                <select
                  className="text-white bg-[#1C1C1C] rounded-[5px] w-[10vw] h-[5vh] rounded-white justify-end"
                  value={select}
                  onChange={handleLanguageChange}
                >
                  {challenge.supported_languages.map((language) => (
                    <option key={language} value={language}>
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-[#1E1E1E] rounded-md">
              <Editor
                height="50vh"
                theme="vs-dark"
                language={select}
                value={challenge.attempt_template_source_code_languages[select]}
              />
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}
