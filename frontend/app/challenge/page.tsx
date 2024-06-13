"use client";

import ButtonUpload from "@/components/buttonUpload/buttonUpload";
import Output from "@/components/output/output";
import Table from "@/components/table/table";

export default function Challenge() {
  return (
    <main className="flex bg-[#121418] min-h-screen">
      <div className="flex w-full">
        <div className="fixed top-20 left-0 h-full">
          <Table />
        </div>
        <div className="ml-auto w-2/3 translate-y-40">
          <div className="bg-[#1C1C1C] h-[40vh] rounded-xl p-5">
            <h1 className="text-white font-bold">Editor de Código</h1>
            {/* Editor de código aqui */}
          </div>
          <div className="-translate-y-20"><Output /></div>
          <div className="flex mt-8 space-x-4 -translate-y-20">
            <div className="flex flex-row w-1/2 gap-4">
              <ButtonUpload />
              <button className="flex items-center font-bold justify-center bg-[#19141D] text-white w-[8vw] h-[7vh] rounded-[10px] hover:bg-gray-700 border-[2px] border-[#6A0DAD]">
                Run Code
              </button>

            </div>
            <div className="flex justify-end w-1/2 -translate-x-10">
              <button className="font-bold w-[10vw] h-[7vh] text-white rounded-[10px] bg-[#6A0DAD]">
                Submit Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}