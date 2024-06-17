import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { ILanguage } from "@/models/types/ILanguage";
import { IChallenge } from "@/models/IChallenge";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Define a type for supported languages
type SupportedLanguages = 'javascript' | 'typescript' | 'python' | 'go';

export default function EditorCreateResult({ challenge }: { challenge: IChallenge }) {
  const [tabSelected, setTabSelected] = useState("1");
  const [select, setSelect] = useState<SupportedLanguages>(
    challenge.supported_languages[0] as SupportedLanguages || "javascript"
  );
  const [allTestsCreated, setAllTestsCreated] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<SupportedLanguages, string>>>({});

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value as SupportedLanguages;
    setSelect(selectedLanguage);
  };

  const handleTab = (value: string) => {
    setTabSelected(value);
  };

  useEffect(() => {
    const checkAllTestsCreated = () => {
      const { supported_languages } = challenge;
      const errors: Partial<Record<SupportedLanguages, string>> = {};

      supported_languages.forEach((language) => {
        const lang = language as SupportedLanguages;
        const template = challenge.attempt_template_source_code_languages[lang];
        const srcTest = challenge.source_code_languages[lang];
        if (!template || template.length < 10) {
          errors[lang] = `Template for ${lang} is missing or too short.`;
        }
        if (!srcTest || srcTest.length < 301) {
          errors[lang] = `Test for ${lang} is missing or too short.`;
        }
      });

      return {
        allCreated: Object.keys(errors).length === 0,
        errors,
      };
    };

    const { allCreated, errors } = checkAllTestsCreated();
    setAllTestsCreated(allCreated);
    setErrors(errors);
  }, [challenge]);

  return (
    <div className="w-full h-fit border-[#5C5C5C] border-[3px] rounded-md p-4">
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
            <div className="flex px-2 pb-2 w-full justify-center items-center">
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
          </div>
        </TabPanel>

        {/* Template code */}
        <TabPanel value="2">
          <div className="flex flex-col gap-2 px-2">
            <div className="flex px-2 pb-2 w-full justify-center items-center">
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
