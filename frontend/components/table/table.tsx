import * as Tabs from "@radix-ui/react-tabs";

export default function Table() {
  return (
    <div className="flex w-[32vw] h-full mt-20">
      <Tabs.Root className="flex w-screen h-full" defaultValue="problem">
        <Tabs.List
          className="flex flex-col  bg-[#0F1014] text-white tranlate-y-20"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="px-2 py-3 text-[15px] leading-none text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none cursor-default transform -rotate-90 origin-top"
            value="problem"
          >
            <h1>Challenge: Hello Word</h1>
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-2 py-3 text-[15px] leading-none text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none cursor-default transform -rotate-90 origin-top"
            value="leaderboard"
          >
            Leaderboard
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow p-5 bg-[#0F1014] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="problem"
        >
          {/* Conteúdo do problema */}
          <h1 className="font-bold text-[20px]">Challenge: Hello Word</h1>
          <div>

            <p className="mt-10 mb-10">The fundamental data types in c are int, float and char. Today, we're discussing int and float data types.</p>
            <p className="mt-10 mb-10">The printf() function prints the given statement to the console. The syntax is printf("format string",argument_list);. In the function, if we are using an integer, character, string or float as argument, then in the format string we have to write.</p>
            <p className="mt-10 mb-10">The scanf() function reads the input data from the console. The syntax is scanf("format string",argument_list);. </p>
            <p className="mt-10 mb-10">For ex: The scanf("%d",&number) statement reads integer number from the console and stores the given value in variable .</p>
            <p className="mt-10 mb-10">To input two integers separated by a space on a single line, the command is scanf("%d %d", &n, &m), where and are the two integers.</p>
          </div>
          <h2 className="font-bold mt-10 mb-10">Input Format</h2>
          <p className="font-bold mt-10 mb-10">List of array  [1,2,3]</p>
        </Tabs.Content>
        <Tabs.Content
          className="grow p-5 bg-[#0F1014] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="leaderboard"
        >
          {/* Conteúdo do leaderboard */}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}