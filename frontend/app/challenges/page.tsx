"use client";

import React, { useEffect, useState } from "react";
import iconSearch from "../../public/icon_search.svg";
import Image from "next/image";
import CardChallenge from "@/components/challenge/cardChallenge";
import imgIa from "../../public/image 11.png";
import { useSetChain } from "@web3-onboard/react";
import inspect from "@/api/api";

export default function HomeChallenge() {
  const [{ connectedChain }] = useSetChain();
  const [inspectData, setInspectData] = useState<string>("");
  const [reports, setReports] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<any>({});
  const [hexData, setHexData] = useState<boolean>(false);
  const [postData, setPostData] = useState<boolean>(false);

  async function getChallenges() {
    try {
      const result = await inspect(connectedChain, "");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getChallenges();
    console.log("oie")
    console.log(reports)
  }, []);
  

  return (
    <div className="w-full">
      <div className=" flex-row bg-[#1F202A] flex w-full h-28 mt-32 items-center justify-between">
        <div className=" flex flex-col gap-y-1">
          <div className="ml-28">Apply</div>
          <h1 className="text-3xl font-semibold ml-28">Get Your Dream Job</h1>
        </div>
        <div className="mr-28">
          <div className="relative">
            <Image
              className="absolute left-3 top-3 h-6 w-6"
              src={iconSearch}
              alt="Search Icon"
            />
            <input
              className="h-12 rounded-lg bg-[#121418] pr-4 pl-10"
              type="text"
              placeholder="Search here"
            />
          </div>
        </div>
      </div>
      <div className="mx-28 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-16 justify-center mb-10">
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
        <CardChallenge
          title="Data Science Challenge"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          wallet="0x38s3...d3d3"
          data="10/10/2021"
          categories="Ia"
          attempt={3}
          image={imgIa}
        />
      </div>
    </div>
  );
}
