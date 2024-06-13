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
  apply: number;
  attempt: number;
  maxScore: number;
  onClick: () => void;
}>) {
  return (
    <Link href="/challenge" passHref>
      <div
        className="flex flex-row items-center justify-between py-6 border-b-2 border-slate-800 cursor-pointer hover:bg-slate-700 transition-colors"
        onClick={onClick}
      >
        <div className="flex flex-col gap-y-2 ml-6">
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
        <div className="flex gap-48 mr-6">
          <p>{attempt}</p>
          <p>{apply}</p>
          <p className="mr-16">{maxScore}</p>
        </div>
      </div>
    </Link>
  );
}
