"use client";
import InitialWords from "@/components/initialWords/initialWords";
import Navbar from "@/components/navbar/navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex p-16 justify-between text-xl max-w-screen-xl mx-auto"
        >
        </motion.div>
        <InitialWords />
      </div>
    </>
  );
}
