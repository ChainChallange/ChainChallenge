"use client";
import InitialWords from "@/components/initialWords/initialWords";
import { useConnectWallet } from "@web3-onboard/react";


export default function Home() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <>
      <main className="flex justify-center items-center w-full h-full bg-background-home-2 bg-cover bg-no-repeat">
        <InitialWords />
      </main>
    </>
  );
}
