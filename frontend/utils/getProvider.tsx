import { ethers } from "ethers";

export const getProvider = (connectedWallet: any) => {
    return new ethers.providers.Web3Provider(connectedWallet.provider);
}