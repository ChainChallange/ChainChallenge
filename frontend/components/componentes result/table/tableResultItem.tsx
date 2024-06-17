/* eslint-disable @next/next/no-img-element */
import React from "react";
import imgAvatar from "../../public/Group 283.png";
import Image from "next/image";
import { IChallengeApplication } from "@/models/IChallenge";

interface TableRankingItemProps {
  participant: IParticipantRanking;
}

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

const TableResultItem = ({ participant }: { participant: IChallengeApplication }) => {
  return (
    <tr
      className="text-center hover:cursor-pointer hover:bg-slate-700 transition-colors"

    >
      <td className="w-3/6">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-lg text-slate-100">{participant.wallet}</div>
          </div>
        </div>
      </td>
      <td className="w-1/6 text-lg text-slate-100">{participant.attempt_number}</td>
      <td className="w-1/6 text-lg text-slate-100">{participant.score}</td>
      <td className="w-1/6 text-lg text-slate-100">
        {participant.passed ? "True" : "False"}
      </td>
    </tr>
  );
};

export default TableResultItem;
