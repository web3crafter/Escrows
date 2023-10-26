"use client"

import { customizableContractAbi } from "@/constants/abi/abis"
import { useContractRead } from "wagmi"

export const useRequestAmount = (contractAddress: string) => {
  const result = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: customizableContractAbi,
    functionName: "requestAmount",
  })

  const modifiedResult = {
    ...result,
  }

  return modifiedResult
}
