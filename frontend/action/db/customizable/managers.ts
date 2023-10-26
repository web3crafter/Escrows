"use server"

import {
  RetrievedContractInfoFromDB,
  getCustomizableContractAddressesFromDB,
} from "@/action/db/customizable/get-contracts"
import { kv } from "@vercel/kv"

export type UpdateManagersMethod = "add" | "remove"

export async function updateManagers(
  contractAddress: string,
  manager: string,
  method: UpdateManagersMethod
) {
  const allContracts: RetrievedContractInfoFromDB[] =
    await getCustomizableContractAddressesFromDB()

  allContracts.map((contract, i) => {
    if (contract.address === contractAddress) {
      if (method === "add") {
        if (!contract.managers.includes(manager)) {
          contract.managers.push(manager)
          kv.lset("customizableContractAddresses", i, contract)
        } else {
          console.log("Address is already an manager")
        }
      }
      if (method === "remove") {
        if (contract.managers.includes(manager)) {
          const newManagers = contract.managers.filter((managerToRemove) => {
            return manager !== managerToRemove
          })
          contract.managers = newManagers
          kv.lset("customizableContractAddresses", i, contract)
        } else {
          console.log("Address is not an manager")
        }
      }
    }
  })
}
