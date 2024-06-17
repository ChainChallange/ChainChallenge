//Create a table component that will be used in the general ranking
//The table will have the following columns(props): Rank, Name, Score, Wallet, photo, quantity of challenges

import * as React from "react";

export default function TableResult({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <table className="table h-[40vh]">
        {/* head */}
        <thead>
          <tr>
            <th className="w-2/5">HACKER</th>
            <th className="w-1/5 text-center">ATTEMPTS NUMBER</th>
            <th className="w-1/5 text-center">SCORE</th>
            <th className="w-1/5 text-center">PASSED</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-rose-500">
          {children}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th className="w-2/5">HACKER</th>
            <th className="w-1/5 text-center">QY CHALLENGES</th>
            <th className="w-1/5 text-center">SCORE</th>
            <th className="w-1/5 text-center">RANK</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
