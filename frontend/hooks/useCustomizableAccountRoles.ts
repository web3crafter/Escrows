"use client"

import { customizableContractAbi } from "@/constants/abi/abis"
import { useAccount, useContractReads } from "wagmi"

export const useCustomizableAccountRoles = (contractAddress: string) => {
  // what do you need into this hook to be able to return what you want
  const { address: accountAddress } = useAccount()

  const address = accountAddress || "0x0000000000000000000000000000000000000000"

  const contract = {
    address: contractAddress as `0x${string}`,
    abi: customizableContractAbi,
  }

  const { data } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: "deployer",
      },
      {
        ...contract,
        functionName: "beneficiary",
      },
      {
        ...contract,
        functionName: "arbiters",
        args: [address],
      },
      {
        ...contract,
        functionName: "managers",
        args: [address],
      },
    ],
  })

  // Logic to turn what you get in, into what you want to return
  const isDeployer = address === data?.[0].result
  const isBeneficiary = address === data?.[1].result
  const isArbiter = data?.[2].result
  const isManager = data?.[3].result

  // what do you want to return from this hook?

  return { isDeployer, isBeneficiary, isArbiter, isManager }
}
