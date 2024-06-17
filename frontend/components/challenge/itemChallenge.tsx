import Image from "next/image";
import React from "react";
import People from "../../public/User.svg";
import Calendar from "../../public/Calendar.svg";
import Link from "next/link";
import { IChallenge } from "@/models/IChallenge";

interface ItemChallengeProps {
  challenge: IChallenge;
  onClick: () => void;
}

export default function ItemChallenge({ challenge, onClick }: ItemChallengeProps){
  return (
    <Link href={`/create-challenges/view/${challenge.id}`} passHref>
      <div
        className="flex flex-row items-center w-full py-6 border-b-2 border-[#5C5C5C] cursor-pointer hover:bg-slate-700 transition-colors"
        onClick={onClick}
      >
        <div className="flex flex-col gap-y-2 pl-6 w-[45vw]">
          <h1 className="font-bold text-2xl">{challenge.title}</h1>
          <p className="text-gray-200">{challenge.description.length > 91
                  ? challenge.description.slice(0, 89) + "..."
                  : challenge.description}</p>
          <div className="flex gap-x-7">
            <div className="flex">
              <Image src={People} alt="icon" />
              <p className="ml-2">{challenge.wallet_of_creator.length > 10
                  ? challenge.wallet_of_creator.slice(0, 8) +
                    "..." +
                    challenge.wallet_of_creator.slice(-8)
                  : challenge.wallet_of_creator}</p>
            </div>
            <div className="flex">
              <Image src={Calendar} alt="icon" />
              <p className="ml-2">{challenge.end_date == null ? "No end date" : challenge.end_date.toISOString()}</p>
            </div>
          </div>
        </div>
        <div className="w-1/5 flex item-center justify-center">
          <p className="">{challenge.quantity_of_applications}</p>
        </div>
        <div className="w-1/5 flex item-center justify-center">
          <p>{challenge.quantity_of_applications_accepted}</p>
        </div>
        <div className="w-1/5 flex item-center justify-center">
          <p>{challenge.quantity_of_applications_rejected}</p>
        </div>
        <div className="w-1/5 flex item-center justify-center">
          <p>{challenge.applications_accepted_ranking.length > 0 ? challenge.applications_accepted_ranking[0].score : 0}</p>
        </div>
      </div>
    </Link>
  );
}
