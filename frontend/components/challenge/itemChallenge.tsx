import Image from "next/image";
import React from "react";
import People from "../../public/User.svg";
import Calendar from "../../public/Calendar.svg";
import Link from "next/link";

export default function ItemChallenge({
  title,
  description,
  data,
  wallet,
  apply,
  attempt,
  maxScore,
  onClick,
}: Readonly<{
  title: string;
  description: string;
  data: string;
  wallet: string;
  apply: number | string;
  attempt: number | string;
  maxScore: number | string;
  onClick: () => void;
}>) {
  return (
    <Link href="/challenge" passHref>
      <div
        className="flex flex-row items-center w-full py-6 border-b-2 border-[#5C5C5C] cursor-pointer hover:bg-slate-700 transition-colors"
        onClick={onClick}
      >
        <div className="flex flex-col gap-y-2 pl-6 w-1/2">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-gray-200">{description}</p>
          <div className="flex gap-x-7">
            <div className="flex">
              <Image src={People} alt="icon" />
              <p className="ml-2">{wallet}</p>
            </div>
            <div className="flex">
              <Image src={Calendar} alt="icon" />
              <p className="ml-2">{data}</p>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex item-center justify-center">
          <p className="">{attempt}</p>
        </div>
        <div className="w-1/4 flex item-center justify-center">
          <p>{apply}</p>
        </div>
        <div className="w-1/4 flex item-center justify-center">
          <p>{maxScore}</p>
        </div>
      </div>
    </Link>
  );
}
