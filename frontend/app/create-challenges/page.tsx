"use client";

import ButtonCustom from "@/components/button/buttonCustom";
import ItemChallenge from "@/components/challenge/itemChallenge";
import React, { useEffect, useState } from "react";
import iconSearch from "../../public/icon_search.svg";
import Image from "next/image";
import CardChallenge from "@/components/challenge/cardChallenge";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { usePathname } from "next/navigation";
import { hexToString } from "@/utils/hexToString";
import { Inspect } from "@/api/api";
import { ethers } from "ethers";
import { reportsToArray } from "@/utils/reportsToArray";
import Link from "next/link";
import { IChallenge } from "@/models/IChallenge";

export default function MyChallenge() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [{ connectedChain }] = useSetChain();
  const [metadata, setMetadata] = useState<any>({});
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  console.log();

  async function fetchChallenge() {
    try {
      if (!connectedChain) {
        //alert("Please connect to a network");
      } else {
        const { reports, metadata } = await Inspect(
          connectedChain,
          `challenges/creators/${wallet?.accounts[0].address as string}`
        );
        setMetadata(metadata);
        console.log(JSON.parse(hexToString(reports[0].payload)));
        setChallenges(JSON.parse(hexToString(reports[0].payload)));
      }
      setLoading(false);
      console.log("passo");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchChallenge();
  }, [wallet]);

  return (
    <main className="flex flex-col min-h-screen w-full gap-14 bg-[#121418] pt-44 px-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl ml-6">Create Challenges</h1>
        <Link href="/create-challenges/create">
          <ButtonCustom className="hover:cursor-pointer">Create Challenge</ButtonCustom>
        </Link>
      </div>
      <div className="flex flex-col w-[95vw]">
        <div className="flex flex-row justify-around border-b-2 w-full border-[#5C5C5C]">
          <div className="w-3/5">
            <p className="text-base pl-6 star">My challenges</p>
          </div>
          <div className="flex item-center justify-center text-base w-1/4">
            <p>Attempts</p>
          </div>
          <div className="flex item-center justify-center text-base w-1/4">
            <p>Accepteds Apply</p>
          </div>
          <div className="flex item-center justify-center text-base w-1/4">
            <p>Rejecteds Apply</p>
          </div>
          <div className="flex item-center justify-center text-base w-1/4">
            <p>Max Score</p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center w-full h-96">
            <p className="text-2xl">Loading...</p>
          </div>
        ) : (
          challenges.map((challenge: IChallenge) => (
            <ItemChallenge
              key={challenge.id}
              challenge={challenge}
              onClick={() => console.log("Hello")}
            />
          ))
        )}
      </div>
    </main>
  );
}
