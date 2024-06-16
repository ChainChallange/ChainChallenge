import { Editor } from "@monaco-editor/react";
import { SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function EditorCreate() {
  const [select, setSelect] = useState("javascript");
  const handleLanguageChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelect(event.target.value);
  };

  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="w-full h-full border-[#5C5C5C] border-[3px] rounded-md p-4">
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: "divider", }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            <Tab label="Teste Cases" value="1" sx={{ color: "#5C5C5C", borderBottom: 5, borderColor: "divider", }} />
            <Tab label="Code Template" value="2" sx={{ color: "#5C5C5C" }}  />
          </TabList>
        </Box>

        {/* Teste cases */}
        <TabPanel value="1">
          <div className="flex flex-col gap-2 px-2">
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
        </TabPanel>
      </TabContext>
    </div>
  );
}
