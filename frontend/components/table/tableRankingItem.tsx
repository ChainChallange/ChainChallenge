import React from "react";

interface TableRankingItemProps {
  name: string;
  wallet: string;
  qty_challenge: string;
  score: string;
  rank: string;
}

const TableRankingItem: React.FC<TableRankingItemProps> = ({
  name,
  wallet,
  qty_challenge,
  score,
  rank,
}) => {
  return (
    <tr className="text-center">
      <td className="w-3/5">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                width={56}
                height={56}
                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className=" text-left">{name}</div>
            <div className="text-sm opacity-50">{wallet}</div>
          </div>
        </div>
      </td>
      <td className="w-1/5">{qty_challenge}</td>
      <td className="w-1/5">{score}</td>
      <td className="w-1/5">{rank}</td>
    </tr>
  );
};

export default TableRankingItem;
