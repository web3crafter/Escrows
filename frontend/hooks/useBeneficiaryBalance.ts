"use client"

import { useBalance } from "wagmi"

export const useBeneficiaryBalance = (beneficiaryAddress: string) => {
  const result = useBalance({
    address: beneficiaryAddress as `0x${string}`,
  })

  const modifiedResult = {
    ...result,
    beneficiaryBalance: result.data?.formatted,
  }

  return modifiedResult
}
