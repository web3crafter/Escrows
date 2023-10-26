"use server"
import { customizableContractAbi } from "@/constants/abi/abis"
import { publicClient } from "@/lib/viem-client"
import { MappingType } from "@/types/types"
import { formatEther } from "viem"

export type MappingInfo = {
  address: string
  amount: string
}

export async function getMappingInfo(
  contractAddress: `0x${string}`,
  addressesArr: string[],
  functionName: MappingType
) {
  const mappingInfoArr: MappingInfo[] = []

  for (let address of addressesArr) {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: customizableContractAbi,
      functionName: functionName,
      args: [address as `0x${string}`],
    })

    const mappingInfo: MappingInfo = {
      address: address,
      amount: formatEther(data),
    }
    mappingInfoArr.push(mappingInfo)
  }

  return mappingInfoArr
}
