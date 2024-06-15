import formatResultInspect from "@/utils/formatInspect";

export default async function Inspect(connectedChain: any, endpoint: string) {
      let apiURL = "http://127.0.0.1:8080/inspect/";
      // if (config[connectedChain.id]?.inspectAPIURL) {
      //     apiURL = `${config[connectedChain.id].inspectAPIURL}/inspect/challenges`;
      // } else {
      //     console.error(`No inspect interface defined for chain ${connectedChain.id}`);
      //     return;
      // }

      return await fetch(apiURL + `${endpoint}/`)
      .then(response => response.json())
      .then(data => {
          return formatResultInspect(data)
      });
};