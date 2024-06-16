import formatResultInspect from "@/utils/formatInspect";

let apiURL = "http://127.0.0.1:8080/inspect/";

export async function Inspect(connectedChain: any, endpoint?: string) {

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