"use client"

import { standardContractAbi } from "@/constants/abi/abis"
import { useContractRead } from "wagmi"

export const useIsApproved = (contractAddress: string) => {
  const result = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
    functionName: "isApproved",
  })

  const modifiedResult = {
    ...result,
  }

  return modifiedResult
}
