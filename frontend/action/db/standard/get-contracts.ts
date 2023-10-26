"use server"

import { kv } from "@vercel/kv"

export async function getSimpleContractAddressesFromDB(
  listName = "contractAddresses",
  start = 0,
  end = -1
) {
  return await kv.lrange(listName, start, end)
}
