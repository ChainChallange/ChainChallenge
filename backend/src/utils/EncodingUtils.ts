import * as viem from "viem";

class EncodingUtils {
    base64Encode(data: any) {
        return Buffer.from(data).toString('base64');
    }

    base64Decode(string: string) {
        return Buffer.from(string, 'base64').toString('utf-8');
    }

    toHex(value: string | number | bigint | boolean) {
        return viem.toHex(value);
    }

    encodingToBlockchain(data: any) {
        return {
            payload: this.toHex(JSON.stringify(data))
        }
    }

    decodeBlockchainPayload(payload: any) {
        return JSON.parse(viem.hexToString(payload));
    }
}


export const encodingUtils = new EncodingUtils();