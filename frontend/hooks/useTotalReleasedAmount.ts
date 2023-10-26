"use client"
import { customizableContractAbi } from "@/constants/abi/abis"
import { useContractRead } from "wagmi"

export const useTotalReleasedAmount = (contractAddress: string) => {
  const result = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: customizableContractAbi,
    functionName: "totalReleasedAmount",
  })

  const modifiedResult = {
    ...result,
  }

  return modifiedResult
}
