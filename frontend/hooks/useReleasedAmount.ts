"use client"
import { standardContractAbi } from "@/constants/abi/abis"
import { useContractRead } from "wagmi"

export const useReleasedAmount = (contractAddress: string) => {
  const result = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
    functionName: "releasedAmount",
  })

  const modifiedResult = {
    ...result,
    releasedAmount: result.data || BigInt(0),
  }

  return modifiedResult
}
