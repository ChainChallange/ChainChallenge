"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { Network } from "../../app/network";
import { init } from "@web3-onboard/react";
import { config } from "../../utils/config";
import injectedModule from "@web3-onboard/injected-wallets";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`fixed top-4 left-0 w-full z-10 transition-transform duration-300 ${showNavbar ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
      <div className="flex items-center justify-between p-4 w-full max-sm:flex-col max-sm:gap-5">
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
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger className="transition hover:text-white hover:cursor-pointer text-zinc-600">
              Challenges
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="rounded-md p-1 flex flex-col gap-3 z-20"
                sideOffset={5}
              >
                <DropdownMenu.Item className="translate-x-7 text-sm hover:text-white hover:cursor-pointer text-zinc-600 text-nowrap">
                  <Link href="/challenges">
                    Explore Challenges
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="translate-x-7 text-sm hover:text-white hover:cursor-pointer text-zinc-600 text-nowrap">
                  <Link href="/my-challenge">
                    My Challenges 
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <div className="w-1/3 flex justify-end max-sm:justify-center items-center">
          <Network />
        </div>
      </div>
    </div>
  );
}
