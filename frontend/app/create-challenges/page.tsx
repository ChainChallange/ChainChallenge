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
import { Inspect } from "@/api/api"
import { ethers } from "ethers";
import { reportsToArray } from "@/utils/reportsToArray";
import Link from "next/link";

interface IResult {
  data: string[];
  metadata: any;
}

interface Challenge {
  wallet_of_creator: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string | null;
  max_applications: number | null;
  max_applications_attempts: number | null;
  min_passed_tests_to_complete: number;
  wallet_of_applicants_only: string[];
  attempt_template_source_code_languages: {
    [language: string]: string;
  };
  source_code_languages: {
    [language: string]: string;
  };
  supported_languages: string[];
  tests: {
    [language: string]: {
      [testId: string]: Test;
    };
  };
  id: string;
  creation_date: string;
  applications: {
    [applicationId: string]: Application;
  };
  applications_accepted_ranking: string[];
  quantity_of_applications: number;
  quantity_of_applications_accepted: number;
  quantity_of_applications_rejected: number;
  quantity_of_tests: number;
}

interface Test {
  title: string;
  code: string;
  id: string;
}

interface Application {
  id: string;
  wallet: string;
  status: "accepted" | "rejected" | "pending";
  attempts: number;
  passed_tests: number;
}

interface TestCase {
  description: string;
  params: number[];
  expected: number;
}

interface TestResultData {
  description: string;
  passed: boolean;
  elapsedTimeInSeconds: string;
}

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
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full gap-14 bg-[#121418] pt-44 px-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl ml-6">My Challenge</h1>
        <Link href="/create-challenges">
          <ButtonCustom className="hover:cursor-pointer">Create Challenge</ButtonCustom>
        </Link>
      </div>
      <div className="flex flex-col w-[95vw]">
        <div className="flex flex-row justify-around border-b-2 w-full border-[#5C5C5C]">
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
        {loading ? (
          <div className="flex justify-center items-center w-full h-96">
            <p className="text-2xl">Loading...</p>
          </div>
        ) : (
          challenges.map((challenge: Challenge) => (
            <ItemChallenge
              key={challenge.id}
              apply={challenge.quantity_of_applications}
              attempt={challenge.quantity_of_applications_accepted}
              data={challenge.end_date == null ? "No data" : challenge.end_date}
              description={
                challenge.description.length > 91
                  ? challenge.description.slice(0, 89) + "..."
                  : challenge.description
              }
              maxScore={
                challenge.applications_accepted_ranking.length > 0
                  ? challenge.applications_accepted_ranking[0].score  
                  : 0
              }
              title={challenge.title}
              wallet={
                challenge.wallet_of_creator.length > 10
                  ? challenge.wallet_of_creator.slice(0, 8) +
                    "..." +
                    challenge.wallet_of_creator.slice(-8)
                  : challenge.wallet_of_creator
              }
              onClick={() => console.log("Hello")}
            />
          ))
        )}
      </div>
    </main>
  );
}
