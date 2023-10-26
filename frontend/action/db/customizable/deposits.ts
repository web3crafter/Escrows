"use server"

import {
  RetrievedContractInfoFromDB,
  getCustomizableContractAddressesFromDB,
} from "@/action/db/customizable/get-contracts"
import { kv } from "@vercel/kv"

export async function updateDeposits(
  contractAddress: string,
  depositor: string
) {
  const allContracts: RetrievedContractInfoFromDB[] =
    await getCustomizableContractAddressesFromDB()

  allContracts.map((contract, i) => {
    if (contract.address === contractAddress) {
      if (!contract.deposits.includes(depositor)) {
        contract.deposits.push(depositor)
        kv.lset("customizableContractAddresses", i, contract)
      }
    }
  })
}
