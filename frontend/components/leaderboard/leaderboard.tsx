import Image from "next/image";
import user from "../../public/Group 283.png";
export default function Leaderboard(Props: any) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full h-20">
        <div className="flex justify-center items-center w-1/3">
          <Image src={user} alt="logo" className="h-8 w-8" />

          <p>0x2gh3...3123</p>
        </div>
        <div className="flex justify-center items-center w-1/3">1</div>
        <div className=" flex items-center justify-center w-1/3">100</div>
      </div>
      <div className="w-full h-[2px] bg-[#5C5C5C] "></div>
    </div>
  );
}
