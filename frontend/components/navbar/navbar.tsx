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
    <div className="fixed top-4 left-0 w-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-14">
        <Link href="/">
          <Image src={Logo} alt="logo" height={60

          } />
        </Link>
        <div className="flex items-center gap-5 font-medium ml-40">
          <Link href="/" className="transition hover:text-white hover:cursor-pointer text-zinc-600">
            Community 
          </Link>
          <Link href="/" className="transition hover:text-white hover:cursor-pointer text-zinc-600">
            Developers Docs
          </Link>
        </div>
        <div className="my-auto ml-auto">
          <Network />
        </div>
      </div>
    </div>
  );
}
