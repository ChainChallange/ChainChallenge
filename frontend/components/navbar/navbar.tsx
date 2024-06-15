"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { Network } from "../../app/network";
import { init } from "@web3-onboard/react";
import configFile from "../../app/config.json";
import injectedModule from "@web3-onboard/injected-wallets";


const config = configFile;
const injected = injectedModule();
init({
  wallets: [injected],
  chains: Object.entries(config).map(([k, v]: [string, any], i) => ({
    id: k,
    token: v.token,
    label: v.label,
    rpcUrl: v.rpcUrl,
  })),
  appMetadata: {
    name: "DecentraAds",
    icon: "<svg><svg/>",
    description: "Decentralized Marketplace for Adspaces",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

export default function Navbar() {
  return (
    <div className="fixed top-4 left-0 w-full z-10">
      <div className=" flex items-center justify-between p-4 w-full max-sm:flex-col max-sm:gap-5">
        <div className="w-1/3 flex justify-start items-center">
          <Link href="/">
            <Image src={Logo} alt="logo" className="h-16 max-md:h-11" />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5 font-medium text-xl w-1/3 max-sm:flex-col max-md:text-sm">
          <Link href="/" className="transition hover:text-white hover:cursor-pointer text-zinc-600">
            Community 
          </Link>
          <Link href="/documentation" className="transition hover:text-white hover:cursor-pointer text-zinc-600 text-nowrap">
            Developers Docs
          </Link>
          <Link href="/" className="transition hover:text-white hover:cursor-pointer text-zinc-600">
            Challenges
          </Link>
        </div>
        <div className="w-1/3 flex justify-end max-sm:justify-center items-center">
          <Network />
        </div>
      </div>
    </div>
  );
}