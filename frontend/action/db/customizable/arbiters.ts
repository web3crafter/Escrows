"use server"

import {
  RetrievedContractInfoFromDB,
  getCustomizableContractAddressesFromDB,
} from "@/action/db/customizable/get-contracts"
import { kv } from "@vercel/kv"

export type UpdateArbitersMethod = "add" | "remove"

export async function updateArbiters(
  contractAddress: string,
  arbiter: string,
  method: UpdateArbitersMethod
) {
  const allContracts: RetrievedContractInfoFromDB[] =
    await getCustomizableContractAddressesFromDB()

  allContracts.map((contract, i) => {
    if (contract.address === contractAddress) {
      if (method === "add") {
        if (!contract.arbiters.includes(arbiter)) {
          contract.arbiters.push(arbiter)
          kv.lset("customizableContractAddresses", i, contract)
        } else {
          console.log("Address is already an arbiter")
        }
      }
      if (method === "remove") {
        if (contract.arbiters.includes(arbiter)) {
          const newArbiters = contract.arbiters.filter((arbiterToRemove) => {
            return arbiter !== arbiterToRemove
          })
          contract.arbiters = newArbiters
          kv.lset("customizableContractAddresses", i, contract)
        } else {
          console.log("Address is not an arbiter")
        }
      }
    }
  })
}
