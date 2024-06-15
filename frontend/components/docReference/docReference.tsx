import { FaChevronRight } from "react-icons/fa";

export default function DocReference() {
  return (
    <div className="flex">
      <div className="w-3/4">
        <h1 className="font-bold text-[20px]">Challenge: Hello Word</h1>
        <div>
          <p className="mt-10 mb-10">
            The fundamental data types in c are int, float and char. Today,
            we're discussing int and float data types.
          </p>
          <p className="mt-10 mb-10">
            The printf() function prints the given statement to the console. The
            syntax is printf("format string",argument_list);. In the function,
            if we are using an integer, character, string or float as argument,
            then in the format string we have to write.
          </p>
          <p className="mt-10 mb-10">
            The scanf() function reads the input data from the console. The
            syntax is scanf("format string",argument_list);.{" "}
          </p>
          <p className="mt-10 mb-10">
            For ex: The scanf("%d",&number) statement reads integer number from
            the console and stores the given value in variable .
          </p>
          <p className="mt-10 mb-10">
            To input two integers separated by a space on a single line, the
            command is scanf("%d %d", &n, &m), where and are the two integers.
          </p>
        </div>
        <h2 className="font-bold mt-10 mb-10">Input Format</h2>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <p className="font-bold mt-10 mb-10">List of array [1,2,3]</p>
        <div className="flex flex-col gap-14">
            <div className="bg-[#9D9D9D] w-full h-[2px]"></div>
            <div className="flex items-center justify-end w-full mb-24 text-white text-[18px] gap-4 cursor-pointer">
                <button className="flex bg-[#6A0DAD] w-[10vw]  h-[5vh] rounded gap-5 items-center justify-center">
                    Route Get 
                    <FaChevronRight />
                </button>
            </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 justify-left items-end text-[15px] gap-4">
        <div className="w-2/4">
          <p className="font-bold">On This Page</p>
        </div>
        <div className="w-2/4 text-[#9D9D9D]">
          <p>Get myWallet</p>
        </div>
        <div className="w-2/4 text-[#9D9D9D]">
          <p>Get myWallet</p>
        </div>
      </div>
    </div>
  );
}
