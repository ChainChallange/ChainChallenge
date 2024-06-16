import Image from "next/image";
import user from "../../public/Group 283.png";

interface LeaderboardProps {
  wallet: string;
  ranking: number;
  score: number;
}

export default function Leaderboard(props: LeaderboardProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full h-20">
        <div className="flex justify-center items-center w-1/3">
          <Image src={user} alt="logo" className="h-8 w-8" />

          <p>{props.wallet}</p>
        </div>
        <div className="flex justify-center items-center w-1/3">{props.ranking}</div>
        <div className=" flex items-center justify-center w-1/3">{props.score}</div>
      </div>
      <div className="w-full h-[2px] bg-[#5C5C5C] "></div>
    </div>
  );
}
