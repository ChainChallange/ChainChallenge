"use client";
import React, { useEffect, useState } from "react";
import walletSvg from "../../../public/Wallet.svg";
import perfil from "../../../public/perfil.png";
import github from "../../../public/github.svg";
import Image from "next/image";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Modal, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { Inspect } from "@/api/api";
import { hexToString } from "@/utils/hexToString";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import CardChallenge from "@/components/challenge/cardChallenge";
// import { useToast } from "@/components/ui/use-toast"
import { getProvider } from "@/utils/getProvider";
import addInput from "@/utils/addInput";


interface Profile {
  wallet_of_creator: string;
  image_link: string;
  nickname: string;
  applications_accepted_quantity: number;
  applications_quantity: number;
  attempts_quantity: number;
  challenges: {
    best_score: {
      score: number;
    };
  };
  challenges_quantity: number;
}

export default function Profile() {
  const pathname = usePathname().split("/")[1];
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [metadata, setMetadata] = useState<any>({});
  const [{ connectedChain }] = useSetChain();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [connectedWallet] = useWallets();

  console.log("pathname", pathname);
  // const toast = useToast();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function fetchProfile() {
    try {
      const { reports, metadata } = await Inspect(
        connectedChain,
        `creators/${wallet?.accounts[0].address as string}`
      );
      setMetadata(metadata);
      console.log("teste", JSON.parse(hexToString(reports[0].payload)));
      setProfile(JSON.parse(hexToString(reports[0].payload)));
    } catch (error) {
      console.error(error);
    }
  }
  console.log("perfil", profile);
  useEffect(() => {
    if (wallet?.accounts[0].address) {
      fetchProfile();
    }
  }, [wallet]);

  const handleUpdateSubmit = async () => {
    const input = {
      method: "applicant_update",
      data: {
        image_link: url,
        nickname: nickname,
      },
    };
    if (connectedChain) {
      const provider = getProvider(connectedWallet);
      const signer = await provider.getSigner();
      console.log("signer and input is ", signer, input);
      addInput(JSON.stringify(input), provider);
    }
  };

  const handleSave = () => {
    handleUpdateSubmit();
    setOpen(false);
  };

  return (
    <main className="flex flex-col bg-[#121418] min-h-screen w-full pt-36 px-20 gap-20">
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-[25px]">Profile</h1>
        <div className="w-full h-[1px] bg-white"></div>
      </div>
      <div className="flex w-full gap-20">
        <div className="flex flex-col w-1/4 gap-20">
          <div className="flex w-full h-[15vh] px-4 py-4 border border-white rounded gap-4">
            <div className="flex pl-6 w-1/4">
              <Image src={perfil} alt="profile" className="h-16 w-16" />
            </div>
            <div className="flex flex-col items-center gap-2 w-2/4">
              <div>
                <p className="text-[20px]">{profile?.nickname || "Loading..."}</p>
              </div>
              <div className="flex gap-4 items-center">
                <Image src={walletSvg} alt="Wallet" className="h-6 w-6" />
                <p className="text-sm">
                  {wallet?.accounts[0].address as string || "Not connected"}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-1/4 items-end">
              <button
                onClick={handleOpen}
                className="text-white h-6 w-6 flex items-center justify-center hover:text-gray-300"
              >
                <FaRegPenToSquare />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-[25vh] border border-white rounded pt-4 px-6 gap-8">
            <div className="flex items-center justify-center">
              <p className="text-[20px]">Additional Information</p>
            </div>
            <div className="flex gap-4 items-center">
              <Image src={github} alt="GitHub" className="h-16 w-16" />
              <p>YagoDevs</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/4 h-[65vh] border border-white rounded gap-20">
          <div className="flex flex-col px-24 gap-16">
            <div className="flex justify-center pt-6">
              <h1 className="text-[25px]">Challenges Solved</h1>
            </div>
            <div className="flex gap-20 justify-center">
              <div className="flex flex-col items-center">
                <h1>Challenge Solved</h1>
                <p>{profile?.applications_accepted_quantity}</p>
              </div>
              <div className="flex flex-col items-center">
                <h1>Highest Score</h1>
                <p>{profile?.challenges?.best_score?.score || 0}</p>
              </div>
              <div className="flex flex-col items-center">
                <h1>Position Ranking</h1>
                <p>{profile?.nickname || 0}</p>
              </div>
              <div className="flex flex-col items-center">
                <h1>Challenges Created</h1>
                <p>{profile?.challenges_quantity || 0}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-center justify-center">
            <CardChallenge
              key="teste"
              title="Challenge IA"
              description="The fundamental data types in c are int, float and char. Today, we're discussing int and float data types..."
              wallet="00x0k12...ka1232"
              data="10/12/2024"
              categories={"IA"}
              attempt="11"
              image={"https://ipfs.io/ipfs/QmPQXYmUKLHW2hLPqrTJWjbsaUW5G6dgycHiSm1Vi7Jtu7"}
            />
            <CardChallenge
              key="yago"
              title="Yago IA"
              description="The fundamental data types in c are int, float and char. Today, we're discussing int and float data types..."
              wallet="00x0k12...ka1232"
              data="10/12/2024"
              categories={"IA"}
              attempt="11"
              image={"https://ipfs.io/ipfs/QmPQXYmUKLHW2hLPqrTJWjbsaUW5G6dgycHiSm1Vi7Jtu7"}
            />
            <CardChallenge
              key="yago"
              title="Yago IA"
              description="The fundamental data types in c are int, float and char. Today, we're discussing int and float data types..."
              wallet="00x0k12...ka1232"
              data="10/12/2024"
              categories={"IA"}
              attempt="11"
              image={"https://ipfs.io/ipfs/QmPQXYmUKLHW2hLPqrTJWjbsaUW5G6dgycHiSm1Vi7Jtu7"}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-modal"
        aria-describedby="edit-profile-description"
        className="flex items-center justify-center"
      >
        <Box className="bg-[#1E1E1E] text-white p-6 rounded-md outline-none w-[90%] max-w-md">
          <h2 className="text-2xl mb-4">Edit Profile</h2>
          <label className="mb-2">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="p-2 mb-4 rounded bg-[#121418] text-white border border-white w-full"
          />
          <label className="mb-2">URL Link</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 mb-4 rounded bg-[#121418] text-white border border-white w-full"
          />
          <button onClick={handleSave} className="p-2 bg-[#6A0DAD] rounded w-full">
            Save
          </button>
        </Box>
      </Modal>
    </main>
  );
}
