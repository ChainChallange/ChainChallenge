import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useCreateChallenge } from "@/contexts/CreateChallengeContext";
import { ILanguage } from "@/models/types/ILanguage";
import { defaultTestJs } from "@/utils/defaultTests";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function EditorCreate() {
  const { challenge, setChallenge } = useCreateChallenge();

  const [tabSelected, setTabSelected] = useState("1");
  const [select, setSelect] = useState<ILanguage>(challenge.supportedLanguages[0] || "javascript");
  const [allTestsCreated, setAllTestsCreated] = useState(false);
  const [errors, setErrors] = useState<{ [key in ILanguage]?: string }>({});

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value as ILanguage;
    setSelect(selectedLanguage);
  };


  const handleCodeChange = (value: string) => {
    const newSourceCodeLanguages = { ...challenge.sourceCodeLanguages, [select]: value };
    setChallenge({ ...challenge, sourceCodeLanguages: newSourceCodeLanguages });
  };

  const handleTab = (value: string) => {
    setTabSelected(value);
  };

  useEffect(() => {
    const checkAllTestsCreated = () => {
      const { supportedLanguages, attemptTemplateSourceCodeLanguages, sourceCodeLanguages } = challenge;
      const errors: { [key in ILanguage]?: string } = {};
  
      supportedLanguages.forEach(language => {
        const template = attemptTemplateSourceCodeLanguages[language];
        const srcTest = sourceCodeLanguages[language];
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
  
    const { allCreated, errors } = checkAllTestsCreated();
    setAllTestsCreated(allCreated);
    setErrors(errors);
  }, [challenge, allTestsCreated]);

  return (
    <div className="w-full h-fit border-[#5C5C5C] border-[3px] rounded-md pl-4">
      <TabContext value={tabSelected}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={() => {
            handleTab(tabSelected === "1" ? "2" : "1");
          }} aria-label="lab API tabs example">
            <Tab label="Test Cases" value="1" sx={{ color: "#5C5C5C", borderBottom: 5, borderColor: "divider" }} />
            <Tab label="Code Template" value="2" sx={{ color: "#5C5C5C" }} />
          </TabList>
        </Box>

        {/* Test Cases */}
        <TabPanel value="1">
          <div className="flex flex-col gap-2 px-2">
            <div className="flex px-2 pb-1 w-full justify-center items-center">
              <div className="w-1/2">
                <h1 className="text-white font-bold text-[24px]">Test Cases</h1>
              </div>
              <div className="flex justify-end w-1/2">
                <select
                  className="text-white bg-[#1C1C1C] rounded-[5px] w-[10vw] h-[5vh] justify-end"
                  value={select}
                  onChange={handleLanguageChange}
                >
                  {challenge.supportedLanguages.map(language => (
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
                value={challenge.sourceCodeLanguages[select] || ""}
                onChange={(newValue: any) => {
                  handleCodeChange(newValue);
                }}
              />
            </div>
            <div className="pt-2">
              {allTestsCreated ? (
                <p className="text-green-500">All tests are created for selected languages.</p>
              ) : (
                <div>
                  <p className="text-red-500">Some tests are missing for selected languages:</p>
                  <ul className="text-red-500">
                    {challenge.supportedLanguages.map(language => (
                      <li key={language}>
                        {errors[language] && (
                          <p>{errors[language]}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </TabPanel>

        {/* Code Template */}
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
                  {challenge.supportedLanguages.map(language => (
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
                value={challenge.attemptTemplateSourceCodeLanguages[select] || ""}
                onChange={(newValue: any) => {
                  setChallenge({
                    ...challenge,
                    attemptTemplateSourceCodeLanguages: {
                      ...challenge.attemptTemplateSourceCodeLanguages,
                      [select]: newValue,
                    },
                  });
                }}
              />
            </div>
            <div className="pt-2">
              {allTestsCreated ? (
                <p className="text-green-500">All templates are created for selected languages.</p>
              ) : (
                <div>
                  <p className="text-red-500">Some templates are missing for selected languages:</p>
                  <ul className="text-red-500">
                    {challenge.supportedLanguages.map(language => (
                      <li key={language}>
                        {errors[language] && (
                          <p>{errors[language]}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}
