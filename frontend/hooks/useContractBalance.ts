"use client"

import { useBalance } from "wagmi"

export const useContractBalance = (contractAddress: string) => {
  // what do you need into this hook to be able to return what you want
  // Logic to turn what you get in, into what you want to return
  const result = useBalance({
    address: contractAddress as `0x${string}`,
  })

  const modifiedResult = {
    ...result,
    contractBalance: result.data?.formatted,
  }

  // what do you want to return from this hook?
  return modifiedResult
}
