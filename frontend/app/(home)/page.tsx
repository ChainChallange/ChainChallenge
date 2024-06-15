"use client";
import InitialWords from "@/components/initialWords/initialWords";
import Navbar from "@/components/navbar/navbar";
import { useNavbarContext, } from "@/contexts/NavbarContext";
import { useConnectWallet } from "@web3-onboard/react";
import { motion } from "framer-motion";
import { useEffect } from "react";


export default function Home() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const { walletSituation } = useNavbarContext();
  console.log(walletSituation)
  return (
    <>
      <main className="flex justify-center items-center w-full h-full bg-background-home-2 bg-cover bg-no-repeat">
        <InitialWords />
      </main>
    </>
  );
}
