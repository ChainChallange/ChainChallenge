import { config } from "@/utils/config";
import { ethers } from "ethers";
import { useState } from "react";
import { useSetChain } from "@web3-onboard/react";

export default function Inspect(connectedChain: any, endpoint: string) {
      let apiURL = "";
      if (config[connectedChain.id]?.inspectAPIURL) {
          apiURL = `${config[connectedChain.id].inspectAPIURL}/inspect/challenges`;
      } else {
          console.error(`No inspect interface defined for chain ${connectedChain.id}`);
          return;
      }

      let fetchData = fetch(`${apiURL}/${endpoint}`);

      fetchData
          .then(response => response.json())
          .then(data => {
            return data;
          });
};