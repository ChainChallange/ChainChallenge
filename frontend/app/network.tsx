"use client";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { config } from "../utils/config";
import { FC, useEffect } from "react";
import { Input } from "./input";
import { useState } from "react";
import { Inspect } from "./inspect";
import { Notice } from "./notices";
import { Report } from "./reports";
import { Voucher } from "./vouchers";
import walletSvg from "../public/Wallet.svg";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

interface NetworkProps {
  wallet: () => void;
}

export const Network: FC = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const [wallets, setWallets] = useWallets();
  const [dappAddress, setDappAddress] = useState<string>(
    "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
  );

  return (
    <div>
      {!wallet && (
        <button
          className="bg-[#6A0DAD] rounded-[10px] h-16 w-52 max-md:w-40 text-nowrap text-base max-md:text-sm max-sm:text-xs max-sm:w-32 flex justify-center items-center gap-4"
          onClick={() => {
            connect();
          }}
        >
          <>
            <Image src={walletSvg} alt="wallet" />
            {connecting ? "Connecting" : "Connect Wallet"}
          </>
        </button>
      )}
      {wallet && (
        <div className="flex justify-center items-center text-nowrap">
          {/* <div className="flex flex-col justify-center items-center">
            <label>Switch Chain</label>
            {settingChain ? (
              <span>Switching chain...</span>
            ) : (
              <select
                className="text-black"
                onChange={({ target: { value } }) => {
                  if (config[value] !== undefined) {
                    setChain({ chainId: value });
                  } else {
                    alert("No deploy on this chain");
                  }
                }}
                value={connectedChain?.id}
              >
                {chains.map(({ id, label }) => {
                  return (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  );
                })}
              </select>
            )}
          </div> */}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="bg-[#6A0DAD] rounded-[10px] h-16 w-52 max-md:w-40 text-nowrap text-base max-md:text-sm max-sm:text-xs max-sm:w-32 flex justify-center items-center gap-4">
                <Image src={walletSvg} alt="wallet" />
                {wallet.accounts[0].address.slice(0, 6) +
                  "..." +
                  wallet.accounts[0].address.slice(-4)}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="DropdownMenuContent">
                <DropdownMenu.Item className="DropdownMenuItem">
                  <button
                    className="rounded-[10px] h-16 w-52 max-md:w-40 text-nowrap text-base max-md:text-sm max-sm:text-xs max-sm:w-32 flex justify-center items-center gap-4"
                    onClick={() => disconnect(wallet)}
                  >
                    Disconnect Wallet
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">
                  <Link href={`applicants/${wallet?.accounts[0].address as string}`}>
                  
                    <button
                      className="rounded-[10px] h-16 w-52 max-md:w-40 text-nowrap text-base max-md:text-sm max-sm:text-xs max-sm:w-32 flex justify-center items-center gap-4"
                    >
                      Profile
                    </button>
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          {/* <button className="bg-[#6A0DAD] rounded-[10px] h-16 w-52 max-md:w-40 text-nowrap text-base max-md:text-sm max-sm:text-xs max-sm:w-32 flex justify-center items-center gap-4" onClick={() => disconnect(wallet)}>Disconnect Wallet</button> */}
          {/* <div>
                        Dapp Address: <input
                            type="text"
                            value={dappAddress}
                            onChange={(e) => setDappAddress(e.target.value)}
                        />
                        <br /><br />
                    </div>
                    <Report />
                    <Notice />
                    <Inspect />
                    <Input dappAddress={"0xab7528bb862fB57E8A2BCd567a2e929a0Be56a5e"} />
                    <Voucher dappAddress={dappAddress} /> */}
                </div>
            )
            }
        </div >
    );
};
