//Create a table component that will be used in the general ranking
//The table will have the following columns(props): Rank, Name, Score, Wallet, photo, quantity of challenges

import * as React from "react";

export default function TableRank({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="w-2/5">HACKER</th>
            <th className="w-1/5 text-center">QY CHALLENGES</th>
            <th className="w-1/5 text-center">SCORE</th>
            <th className="w-1/5 text-center">RANK</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
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
