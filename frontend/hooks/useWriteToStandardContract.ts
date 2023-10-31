import { standardContractAbi } from "@/constants/abi/abis"
import { useContractWrite } from "wagmi"

export type StandardFunctions = "approve" | "deposit"

export const useWriteToStandardContract = (
  contractAddress: string,
  contractFunctionName: StandardFunctions
) => {
  const result = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
    functionName: contractFunctionName,
  })

  const modifiedResult = {
    ...result,
  }

  return modifiedResult
}
