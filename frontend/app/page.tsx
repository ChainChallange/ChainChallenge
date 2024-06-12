"use client";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import configFile from "./config.json";
import { Network } from "./network";
import Navbar from "@/components/navbar/navbar";
import InitialWords from "@/components/initialWords/initialWords";
import { motion } from "framer-motion";

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
export default function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex p-10 justify-between text-xl max-w-screen-xl mx-auto"
      >
        <Navbar></Navbar>
      </motion.div>
      <InitialWords />
    </div>
  );
}
