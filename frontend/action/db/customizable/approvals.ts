"use server"

import {
  RetrievedContractInfoFromDB,
  getCustomizableContractAddressesFromDB,
} from "@/action/db/customizable/get-contracts"
import { kv } from "@vercel/kv"

export async function updateApprovals(
  contractAddress: string,
  arbiter: string
) {
  const allContracts: RetrievedContractInfoFromDB[] =
    await getCustomizableContractAddressesFromDB()

  allContracts.map((contract, i) => {
    if (contract.address === contractAddress) {
      if (!contract.approvals.includes(arbiter)) {
        contract.approvals.push(arbiter)
        kv.lset("customizableContractAddresses", i, contract)
      }
    }
  })
}
