"use client";
import InitialWords from "@/components/initialWords/initialWords";
import Navbar from "@/components/navbar/navbar";
import { useNavbarContext, } from "@/contexts/NavbarContext";
import { useConnectWallet } from "@web3-onboard/react";


export default function Docs() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const { walletSituation } = useNavbarContext();
  console.log(walletSituation)
  return (
    <>
      <Navbar />
      <main className="p-16 flex justify-center items-center w-full h- min-h-screen bg-backgroundColor">
        <section>
          
        </section>
      </main>
    </>
  );
}
