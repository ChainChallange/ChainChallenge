"use client";

import React, { useEffect, useState } from "react";
import iconSearch from "../../public/icon_search.svg";
import Image from "next/image";
import CardChallenge from "@/components/challenge/cardChallenge";
import { useSetChain } from "@web3-onboard/react";
import { Inspect } from "@/api/api";
import { usePathname } from "next/navigation";
import { hexToString } from "@/utils/hexToString";
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

export default function HomeChallenge() {
  const pathname = usePathname().split("/")[1];
  const [{ connectedChain }] = useSetChain();
  const [challenges, setChallenges] = useState([]);
  const [metadata, setMetadata] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    try {
      const { reports, metadata } = await Inspect(connectedChain, pathname);
      setMetadata(metadata)
      setChallenges(JSON.parse(hexToString(reports[0].payload)))
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-[86vh]">
      <div className="w-full">
        <div className="flex-row bg-[#1F202A] flex w-full h-[138px] mt-32 items-center justify-between">
          <div className=" flex flex-col gap-y-1">
            <div className="ml-28">Apply</div>
            <h1 className="text-3xl font-semibold ml-28">Get Your Dream Job</h1>
          </div>
          <div className="mr-28">
            <div className="relative">
              <Image
                className="absolute left-3 top-3 h-6 w-6"
                src={iconSearch}
                alt="Search Icon"
              />
              <input
                className="h-12 rounded-lg bg-[#121418] pr-4 pl-10"
                type="text"
                placeholder="Search here"
              />
            </div>
          </div>
        </div>
        <div className="mx-28 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-16 justify-center mb-10">
          {loading ? (
            <div>Loading challenges...</div>
          ) : challenges.length > 0 ? (
            challenges.map((challenge: Challenge) => {

              return (
                <Link 
                  href={`/challenges/${challenge.id}`} key={challenge.id}
                  className="w-[345px] rounded-lg bg-backgroundColor"  
                >
                  <CardChallenge
                    key={challenge.id}
                    title={challenge.title}
                    description={challenge.description.length > 91 ? challenge.description.slice(0, 89) + "..." : challenge.description}
                    wallet={challenge.wallet_of_creator.length > 10 ? challenge.wallet_of_creator.slice(0, 8) + "..." + challenge.wallet_of_creator.slice(-8) : challenge.wallet_of_creator}
                    data={challenge.end_date == null ? "No end date" : challenge.end_date}
                    categories={"IA"}
                    attempt={challenge.max_applications_attempts == null ? "∞" : challenge.max_applications_attempts}
                    image={"https://ipfs.io/ipfs/QmPQXYmUKLHW2hLPqrTJWjbsaUW5G6dgycHiSm1Vi7Jtu7"}
                  />
                </Link>
              );
            })
          ) : (
            <div>No challenges found</div>
          )}
        </div>
      </div>
    </main>
  );
}
