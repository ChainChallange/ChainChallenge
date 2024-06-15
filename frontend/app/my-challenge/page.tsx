"use client";

import ButtonCustom from "@/components/button/buttonCustom";
import ItemChallenge from "@/components/challenge/itemChallenge";

export default function MyChallenge() {
  return (
    <main className="flex flex-col min-h-screen w-full gap-14 bg-[#121418] pt-44 px-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl ml-6">My Challenge</h1>
        <ButtonCustom onClick={() => console.log("Hello")}>Create Challenge</ButtonCustom>
      </div>
      <div className="flex flex-col w-[95vw]">
        <div className="flex flex-row justify-around border-b-2 w-full border-slate-800">
          <div className="w-4/6">
            <p className="text-base pl-6 star">Challenges</p>
          </div>
          <div className="flex item-center justify-center text-base w-1/3">
            <p>Attempts</p>
          </div>
          <div className="flex item-center justify-center text-base w-1/3">
            <p>Users Apply</p>
          </div>
          <div className="flex item-center justify-center text-base w-1/3">
            <p>Max Score</p>
          </div>
        </div>
        <ItemChallenge
          title="Challenge 1"
          description="Description 1"
          data="Data 1"
          wallet="Wallet 1"
          apply={1}
          attempt={0}
          maxScore={10}
          onClick={() => console.log("Hello")}
        />
        <ItemChallenge
          title="Challenge 1"
          description="Description 1"
          data="Data 1"
          wallet="Wallet 1"
          apply={1}
          attempt={0}
          maxScore={10}
          onClick={() => console.log("Hello")}
        />
      </div>
    </main>
  );
}
