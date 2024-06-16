"use client";

import ButtonCustom from "@/components/button/buttonCustom";
import ItemChallenge from "@/components/challenge/itemChallenge";
import TableRank from "@/components/table/tableRanking";
import TableRankingItem from "@/components/table/tableRankingItem";
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

interface IParticipantRanking {
  wallet: string;
  score: number;
  position: number;
  attempts_quantity: number;
  applications_accepted_quantity: number;
  challenges_quantity: number;
  nickname: string | null;
  image_link: string | null;
}

export default function MyChallenge() {
  const [{ connectedChain }] = useSetChain();
  const [ranking, setRanking] = useState<IParticipantRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<any>({});


  useEffect(() => {
    async function getRanking() {
      try {
        const { reports, metadata } = await Inspect(connectedChain, "ranking");
        const rankingData = JSON.parse(hexToString(reports[0].payload));
        setRanking(rankingData);
        setMetadata(metadata);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getRanking();
  }, [connectedChain]);

  return (
    <main className="flex flex-col h-fit w-full bg-[#121418] pt-36 pb-2 px-6">
      <h1 className="text-2xl text-bold ml-6 mb-6">General Ranking</h1>
      {loading ? (
        <div>Loading challenges...</div>
      ) : ranking.length > 0 ? (
        <TableRank>
          {ranking.map((participant, index) => (
            <TableRankingItem
              key={index}
              participant={participant}
            />
          ))}
        </TableRank>
      ) : (
        <div>No challenges found</div>
      )}
    </main>
  );
}
