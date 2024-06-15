import * as viem from "viem"

export function hexToString(hex: `0x${string}`) {
  return viem.hexToString(hex)
}

export function stringToHex(str: string) {
  return viem.stringToHex(str)
}