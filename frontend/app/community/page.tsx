"use client";

import ButtonCustom from "@/components/button/buttonCustom";
import ItemChallenge from "@/components/challenge/itemChallenge";
import TableRank from "@/components/table/tableRanking";
import TableRankingItem from "@/components/table/tableRankingItem";

export default function MyChallenge() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-[#121418] pt-36 px-6">
      <h1 className="text-2xl text-bold ml-6 mb-6">General Ranking</h1>
      <TableRank>
        <TableRankingItem
          name={"Heitor"}
          wallet={"0x38s3...d3d3"}
          qty_challenge={"13212"}
          score={"12312"}
          rank={"1"}
        />
        <TableRankingItem
          name={"Heitor"}
          wallet={"0x38s3...d3d3"}
          qty_challenge={"13212"}
          score={"12312"}
          rank={"1"}
        />
        <TableRankingItem
          name={"Heitor"}
          wallet={"0x38s3...d3d3"}
          qty_challenge={"13212"}
          score={"12312"}
          rank={"1"}
        />
        <TableRankingItem
          name={"Heitor"}
          wallet={"0x38s3...d3d3"}
          qty_challenge={"13212"}
          score={"12312"}
          rank={"1"}
        />
        <TableRankingItem
          name={"Heitor"}
          wallet={"0x38s3...d3d3"}
          qty_challenge={"13212"}
          score={"12312"}
          rank={"1"}
        />
      </TableRank>
    </main>
  );
}