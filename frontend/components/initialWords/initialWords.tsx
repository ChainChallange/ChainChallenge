import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InitialWords() {
  return (
    <div className="flex justify-center items-center max-w-screen-2x min-h-screen w-full bg-[RGBA(0,0,0,0.6)]">
      <div className="flex justify-center items-center z-1 py-10">
        <div className="text-center pt-16 flex flex-col justify-center items-center">
          <motion.h1
            initial={{ y: 70, opacity: 0, color: "#000" }}
            animate={{ y: 0, opacity: 1, color: "rgba(255,255,255, 0.8)" }}
            transition={{ duration: 1.4 }}
            className="font-medium text-5xl lg:text-7xl text-white"
          >
            Chain Challenge <br />
            Decentralized{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
              className="font-bold text-white shadow-white drop-shadow-lg"
            >
              Algorithms
              <div className="w-full flex justify-end px-1">
                <div className="bg-[#9400FF] w-[20vw] h-1 mt-4"></div>
              </div>
            </motion.span>
          </motion.h1>
          <motion.p
            className="lg:text-xl leading-relaxed text-neutral-300 mt-4 p-10 max-w-screen-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            ChainChallenge is a decentralized programming platform 
            that ensures your achievements are truly yours.{" "}
            <span className="font-semibold">
              Companies and individuals can create their own challenges, and an API 
              is available for those who want to build their own product.
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="flex flex-wrap justify-center mb-20 md:mb-0 mx-4 gap-10"
          >
            <Link href="/challenges">
            
              <button className="bg-[#6A0DAD] w-44 h-16 rounded">Get Started </button>
            </Link>
            <Link href="/documentation">

              <button className="bg-[#6A0DAD] w-44 h-16 rounded">Developers Docs </button>
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 3.5,
          repeat: 8,
          repeatType: "reverse",
        }}
      ></motion.div>
    </div>
  )
}