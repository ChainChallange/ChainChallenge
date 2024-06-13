import Image from "next/image";
import Cloud from "../../public/Cloud.svg";

export default function ButtonUpload() {
  return (
    <button
      className="gap-2 flex items-center font-bold justify-center bg-[#19141D] text-white w-[15vw] h-[7vh] rounded-[10px] hover:bg-gray-700 border-[2px] border-[#6A0DAD]"
    >
      <Image src={Cloud} alt="logo" height={24} width={24} />
      <span className="ml-2">Upload Code as File</span>
    </button>
  );
}
