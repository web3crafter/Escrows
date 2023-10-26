import {
  IEscrow,
  RetrievedCustomizableInfoFromSmartContract,
  RetrievedStandardInfoFromSmartContract,
} from "@/types/types"
import {
  customizableContractAbi,
  standardContractAbi,
} from "@/constants/abi/abis"
import { publicClient } from "@/lib/viem-client"
import { formatEther } from "viem"

export const getStandardContractInfo = async (
  standardContractAddress: string
) => {
  const contractAddress = standardContractAddress as `0x${string}`
  const standardContract = {
    address: contractAddress,
    abi: standardContractAbi,
  } as const
  try {
    const standardContractInfo = await publicClient.multicall({
      contracts: [
        {
          ...standardContract,
          functionName: "deployer",
        },
        {
          ...standardContract,
          functionName: "arbiter",
        },
        {
          ...standardContract,
          functionName: "beneficiary",
        },
      ],
    })

    const deployer = standardContractInfo[0].result as string
    const arbiter = standardContractInfo[1].result as string
    const beneficiary = standardContractInfo[2].result as string

    const contract: RetrievedStandardInfoFromSmartContract = {
      contractAddress,
      deployer,
      arbiter,
      beneficiary,
    }

    return contract
  } catch (error) {
    console.log("error:", error)

    const contract: RetrievedStandardInfoFromSmartContract = {
      contractAddress,
      deployer: "",
      arbiter: "",
      beneficiary: "",
    }
    return contract
  }
}

export const getCustomizableContractInfo = async (
  customizableContractAddress: string
) => {
  //TODO: Error handling
  const contractAddress = customizableContractAddress as `0x${string}`
  const contractInfo = await publicClient.readContract({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "getContractInfo",
  })

  const contract: RetrievedCustomizableInfoFromSmartContract = {
    deployer: contractInfo[0],
    beneficiary: contractInfo[1],
    requestAmount: formatEther(contractInfo[2]),
    totalReleasedAmount: formatEther(contractInfo[3]),
    balance: formatEther(contractInfo[4]),
  }
  return contract
}
