import * as Tabs from "@radix-ui/react-tabs";
import Leaderboard from "../leaderboard/leaderboard";
import ReactMarkdown from 'react-markdown'
import { IChallenge, IChallengeApplication } from "@/models/IChallenge";
import { IWallet } from "@/models/types/IWallet";

interface TableProps {
  title: string;
  description: string;
  wallet_of_creator: IWallet;
  ranking: IChallengeApplication[];
}

export default function Table(props: IChallenge) {
  return (
    <div className="flex h-full bg-[#0F1014] rounded-md py-2">
      <Tabs.Root
        className="flex flex-col gap-2 pl-2 w-screen h-full"
        defaultValue="problem"
      >
        <Tabs.List
          className="flex gap-1 text-white w-full"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="px-2 py-3 rounded-md text-[15px] leading-none text-nowrap text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none cursor-default"
            value="problem"
          >
            <h1>{props.title}</h1>
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-2 py-3 rounded-md text-[15px] leading-none text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none cursor-default transform origin-top"
            value="leaderboard"
          >
            Leaderboard
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black h-52 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-rose-500 "
          value="problem"
        >
          {/* Conteúdo do problema */}
          <h1 className="font-bold text-[20px]">{props.title}</h1>
          <div className="pt-3">
            <ReactMarkdown>
              {props.description}
            </ReactMarkdown>
          </div>
        </Tabs.Content>
        <Tabs.Content
          className="grow p-5 bg-[#0F1014] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black overflow-auto"
          value="leaderboard"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <div className="flex w-full ">
                  <div className="flex items-center justify-center w-1/3">
                    Hacker
                  </div>
                  <div className="flex justify-center w-1/3">Rank</div>
                  <div className="flex justify-center w-1/3">Score</div>
                </div>
                <div className="w-full h-[2px] bg-[#5C5C5C]"></div>
              </div>
              { props.applications_accepted_ranking &&
                props.applications_accepted_ranking.length > 0 ? props.applications_accepted_ranking.map((hacker: IChallengeApplication, index) => {
                  return (
                    <Leaderboard key={index} wallet={hacker.wallet.slice(0, 6) + "..." + hacker.wallet.slice(-4)} ranking={index + 1} score={hacker.score} id={hacker.id} passed={hacker.passed} attempt_number={hacker.attempt_number} date={hacker.date} />
                  )
                }) : <p>No data</p>

              }
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
