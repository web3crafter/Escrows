"use server"

import { kv } from "@vercel/kv"

export interface RetrievedContractInfoFromDB {
  address: string
  arbiters: string[]
  managers: string[]
  deposits: string[]
  approvals: string[]
}

export async function getCustomizableContractAddressesFromDB(
  listName = "customizableContractAddresses",
  start = 0,
  end = -1
) {
  const allContracts = await kv.lrange(listName, start, end)
  const stringifiedContracts = JSON.stringify(allContracts)
  const parsedContracts = JSON.parse(stringifiedContracts)

  return parsedContracts as RetrievedContractInfoFromDB[]
}

export async function getSpecificContractAddressFromDB(
  contractAddress: string
) {
  const allContracts = await getCustomizableContractAddressesFromDB()

  const wantedContract = allContracts.filter(
    (contract: RetrievedContractInfoFromDB) => {
      return contract.address === contractAddress
    }
  )

  return wantedContract[0] as RetrievedContractInfoFromDB
}
