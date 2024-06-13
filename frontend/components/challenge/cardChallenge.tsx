import * as React from "react";

import Image, { StaticImageData } from "next/image";
import iconWallet from "../../public/Receipt.svg";
import iconCalendar from "../../public/Calendar.svg";
import iconStar from "../../public/Star 2.svg";
import iconDoc from "../../public/Document.svg";

export default function CardChallenge({
  title,
  description,
  wallet,
  data,
  categories,
  attempt,
  image,
}: {
  title: string;
  description: string;
  wallet: string;
  attempt: number;
  data: string;
  categories: string;
  image: StaticImageData;
}) {
  return (
    <div className="w-fit">
      <Image
        src={image.src}
        alt={title}
        className="rounded-t-2xl"
        width={300}
        height={300}
      />
      <div className="p-6 bg-[#1F202A] w-[300px] rounded-b-2xl flex flex-col gap-y-4">
        <div className="flex">
          <Image src={iconWallet} alt="icon" className="opacity-60" />
          <p className="ml-2 opacity-60 text-sm">{wallet}</p>
        </div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-[#D1D1D1]">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex">
            <Image src={iconDoc} alt="icon" className="opacity-60" />
            <p className="ml-2 opacity-60 text-sm">{attempt}</p>
          </div>
          <div className="flex">
            <Image src={iconStar} alt="icon" className="opacity-60" />
            <p className="ml-2 opacity-60 text-sm">{categories}</p>
          </div>
          <div className="flex">
            <Image src={iconCalendar} alt="icon" className="opacity-60" />
            <p className="ml-2 opacity-60 text-sm">{data}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
