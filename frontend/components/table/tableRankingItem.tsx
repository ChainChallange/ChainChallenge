/* eslint-disable @next/next/no-img-element */
import React from "react";
import imgAvatar from "../../public/Group 283.png";
import Image from "next/image";

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

const TableRankingItem: React.FC<TableRankingItemProps> = ({ participant }) => {
  let img = participant.image_link == null ? imgAvatar : participant.image_link;

  return (
    <tr
      className="text-center hover:cursor-pointer hover:bg-slate-700 transition-colors"
      onClick={() => console.log("sa")}
    >
      <td className="w-3/6">
        <div className="flex items-center gap-4">
          <div className="mask mask-squircle">
            <Image height={70} width={70} src={img} alt="img avatar" />
          </div>
          <div>
            <div className=" text-left text-lg">
              {participant.nickname == null ? "Anonymous" : participant.nickname}
            </div>
            <div className="text-sm opacity-50">{participant.wallet}</div>
          </div>
        </div>
      </td>
      <td className="w-1/6 text-lg text-slate-100">
        {participant.applications_accepted_quantity +
          " / " +
          participant.challenges_quantity}
      </td>
      <td className="w-1/6 text-lg text-slate-100">{participant.score}</td>
      <td className="w-1/6 text-lg text-slate-100">{participant.position}</td>
    </tr>
  );
};

export default TableRankingItem;
