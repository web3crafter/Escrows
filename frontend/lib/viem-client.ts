import { createPublicClient, createWalletClient, custom, http } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"

const transport = http(process.env.NEXT_PUBLIC_RPC_URL)

export const publicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: sepolia,
  transport: http(),
})

export const getWalletClient = async () => {
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  })

  const accounts = await walletClient.requestAddresses()
  const account = privateKeyToAccount(accounts[0])

  const [address] = await walletClient.getAddresses()

  return { walletClient, address, account }
}
