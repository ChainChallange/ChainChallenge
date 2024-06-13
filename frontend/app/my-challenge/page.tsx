"use client";

import ButtonCustom from "@/components/button/buttonCustom";
import ItemChallenge from "@/components/challenge/itemChallenge";

export default function MyChallenge() {
  return (
    <div className="mt-40 mx-14">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl ml-6">My Challenge</h1>
        <ButtonCustom onClick={() => console.log("Hello")}>Create Challenge</ButtonCustom>
      </div>
      <div className="mt-14">
        <div className="flex flex-row justify-between border-b-2 border-slate-800 pb-2">
          <p className="text-base ml-6">Challenges</p>
          <div className="flex gap-24 mr-14">
            <p className="text-base ml-6">Attempts</p>
            <p className="text-base ml-6">Users Apply</p>
            <p className="text-base ml-6">Max Score</p>
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
    </div>
  );
}
