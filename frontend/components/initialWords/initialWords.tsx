import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";

export default function InitialWords(){
    return(
    <div className="h-fit md:mb-12 mb-8 pt-20 relative mx-auto max-w-screen-2xl">
        <div className="relative z-1">
          <div className="text-center pt-16">
            <motion.h1
              initial={{ y: 70, opacity: 0, color: "#000" }}
              animate={{ y: 0, opacity: 1, color: "#777" }}
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
                Algorithms<div className="bg-[#9400FF] w-[20vw] h-1 translate-x-[43vw] mt-4"></div>
              </motion.span>
            </motion.h1>
            <motion.p
              className="lg:text-xl leading-relaxed text-neutral-300 mt-4 p-10 max-w-screen-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
            >
              DeVolt is a descentralized solution focused on providing the
              eletricity needed for eletric cars.{" "}
              <span className="font-semibold">
                With monetary incentives, logistical facilitations, more
                accessible stations, and an open, fully transparent market.
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="flex flex-wrap justify-center mb-20 md:mb-0 mx-4 gap-10"
            >
              <button className="bg-[#6A0DAD] w-44 h-16 rounded">Get Start </button>
              <button className="bg-[#6A0DAD] w-44 h-16 rounded">Developers Docs </button>
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