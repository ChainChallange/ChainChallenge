import { advanceInput } from 'cartesi-client';
import { ethers } from 'ethers';
import { dappAddress } from './getDappAddress';
export default async function addInput(input: string, provider: ethers.providers.Web3Provider) {
    console.log("adding input", input);
    const signer = await provider.getSigner();
    console.log("signer and input is ", signer, input);
    advanceInput(signer, dappAddress, input);
}