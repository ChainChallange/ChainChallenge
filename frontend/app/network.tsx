import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import configFile from "./config.json";
import { FC } from "react";
const config: any = configFile;
import { Input } from "./input";
import { useState } from "react";
import { Inspect } from "./inspect";
import { Notice } from "./notices";
import { Report } from './reports';
import { Voucher } from './vouchers';
import walletSvg from "../public/Wallet.svg";
import Image from "next/image";

interface NetworkProps {
    wallet: () => void;
}

export const Network: FC = () => {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
    const [dappAddress, setDappAddress] = useState<string>(
        "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
    );
    return (
        <div>
            {!wallet && (
                <button className="bg-[#6A0DAD] rounded-[10px] h-16 w-52 max-md:w-40 text-nowrap text-base max-md:text-sm max-sm:text-xs max-sm:w-32 flex justify-center items-center gap-4" onClick={() => connect()}>
                    <>
                        <Image src={walletSvg} alt="wallet" />
                        {connecting ? "connecting" : "Connect Wallet"}
                    </>
                </button>
            )}
            {wallet && (
                <div>
                    <label>Switch Chain</label>
                    {settingChain ? (
                        <span>Switching chain...</span>
                    ) : (
                        <select
                            onChange={({ target: { value } }) => {
                                if (config[value] !== undefined) {
                                    setChain({ chainId: value });
                                } else {
                                    alert("No deploy on this chain");
                                }
                            }}
                            value={connectedChain?.id}
                        >
                            {chains.map(({ id, label }) => {
                                return (
                                    <option key={id} value={id}>
                                        {label}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                    <button onClick={() => disconnect(wallet)}>Disconnect Wallet</button>
                    <div>
                        Dapp Address: <input
                            type="text"
                            value={dappAddress}
                            onChange={(e) => setDappAddress(e.target.value)}
                        />
                        <br /><br />
                    </div>
                    <Input dappAddress={dappAddress} />
                    <Inspect />
                    <Report />
                    <Notice />
                    <Voucher dappAddress={dappAddress} />
                </div>
            )
            }
        </div >
    );
};