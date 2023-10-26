"use server"

import { kv } from "@vercel/kv"

export async function storeContractAddress(
  address: string,
  listName = "contractAddresses"
) {
  await kv.lpush(listName, address)
}

export async function storeCustomizableContractAddress(
  objToStore: object,
  listName = "customizableContractAddresses"
) {
  await kv.lpush(listName, objToStore)
}
