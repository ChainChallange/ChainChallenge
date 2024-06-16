"use client"
import React, { useState } from "react";
import walletSvg from "../../../public/Wallet.svg";
import perfil from "../../../public/perfil.png";
import github from "../../../public/github.svg";
import Image from "next/image";
import Slider from "react-slick";
import CardChallenge from "@/components/challenge/cardChallenge";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Modal, Box } from "@mui/material";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [url, setUrl] = useState("");

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Image src={perfil} alt="logo" className="h-16 w-16" />
            </div>
            <div className="flex flex-col items-center gap-2 w-2/4">
              <div>
                <p className="text-[20px]">Yago Phellipe</p>
              </div>
              <div className="flex gap-4 items-center">
                <Image src={walletSvg} alt="Wallet" className="h-6 w-6" />
                <p className="text-sm">00x21ks3...7jb38</p>
              </div>
            </div>
            <div className="flex flex-col w-1/4 items-end">
              {/* quando clicar nesse componente abaixo, ele abre um modal com as seguintes informações: nickname e um input embaixo link url e um input embaixo */}
              <button onClick={handleOpen} className="text-white h-6 w-6 flex items-center justify-center hover:text-gray-300">
                <FaRegPenToSquare />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-[25vh] border border-white rounded pt-4 px-6 gap-8">
            <div className="flex items-center justify-center">
              <p className="text-[20px]">Additional Information</p>
            </div>
            <div className="flex gap-4 items-center">
              <Image src={github} alt="Wallet" className="h-16 w-16" />
              <p>YagoDevs</p>
            </div>
          </div>
        </div>
        <div className="w-3/4 h-[60vh] border border-white rounded">
          <div className="flex flex-col px-24 gap-16">
            <div className="flex justify-center pt-6">
              <h1 className="text-[25px]">Challenges Solved</h1>
            </div>
            <div className="flex gap-20">
                <div className="flex flex-col items-center">
                  <h1>Challenge Solved</h1>
                  <p>20</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1>Highest Score</h1>
                  <p>100</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1>Position Ranking</h1>
                  <p>100</p>
                </div>
            </div>
          </div>
          <div className="">
             {/* <Slider {...settings}>
              <div className="flex">
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
              </div>
            </Slider> */}
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
          <button onClick={handleClose} className="p-2 bg-[#6A0DAD] rounded w-full">
            Save
          </button>
        </Box>
      </Modal>
    </main>
  );
}
