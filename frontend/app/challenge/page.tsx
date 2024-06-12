"use client";
import * as Tabs from "@radix-ui/react-tabs";

export default function Challenge() {
  return (
    <main className="flex bg-[#121418] min-h-screen">
      <div className="flex w-[800px] h-4/5 fixed bottom">
        <Tabs.Root
          className="flex w-full shadow-blackA2"
          defaultValue="problem"
        >
          <Tabs.List
            className="flex bg-[#0F1014] text-white"
            aria-label="Manage your account"
            style={{ flexDirection: "row" }}
          >
            <Tabs.Trigger
              className="px-5 py-3 text-[15px] leading-none text-white select-none hover:bg-gray-700 data-state=active:bg-gray-600 data-state=active:font-bold outline-none cursor-default"
              value="problem"
              style={{
                transform: "rotate(270deg)",
                whiteSpace: "nowrap",
                writingMode: "vertical-lr",
              }}
            >
              Problem
            </Tabs.Trigger>
            <Tabs.Trigger
              className="px-5 py-3 text-[15px] leading-none text-white select-none hover:bg-gray-700 data-state=active:bg-gray-600 data-state=active:font-bold outline-none cursor-default"
              value="leaderboard"
              style={{
                transform: "rotate(270deg)",
                whiteSpace: "nowrap",
                writingMode: "vertical-lr",
              }}
            >
              Leaderboard
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow p-5 bg-[#0F1014] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="problem"
          >
            {/* Conteúdo do problema */}
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-[#0F1014] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="leaderboard"
          >
            {/* Conteúdo do leaderboard */}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  );  
}
