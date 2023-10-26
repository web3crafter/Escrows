"use client"

import { standardContractAbi } from "@/constants/abi/abis"
import { useAccount, useContractReads } from "wagmi"

export const useStandardAccountRoles = (contractAddress: string) => {
  const { address: accountAddress } = useAccount()
  // const address = accountAddress || "0x0000000000000000000000000000000000000000"

  const contract = {
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
  }

  const { data } = useContractReads({
    contracts: [
      { ...contract, functionName: "deployer" },
      { ...contract, functionName: "beneficiary" },
      { ...contract, functionName: "arbiter" },
    ],
  })

  const isDeployer = accountAddress === data?.[0].result
  const isBeneficiary = accountAddress === data?.[1].result
  const isArbiter = accountAddress === data?.[2].result

  return { isDeployer, isBeneficiary, isArbiter }
}
