export default function Output(){
    return(
        <div className="bg-[#1C1C1C] w-[65vw] h-[24vh] rounded-xl p-5">
            <h1 className="text-white font-bold">Output:</h1>
            <textarea className="w-full h-[18vh] bg-[#1C1C1C] text-white focus:outline-none hover:cursor-default resize-none" readOnly></textarea>
        </div>
    )
}
