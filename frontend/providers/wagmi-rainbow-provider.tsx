"use client"
import "@rainbow-me/rainbowkit/styles.css"
import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { sepolia, hardhat } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { useEffect, useState } from "react"

const { chains, publicClient } = configureChains(
  [sepolia, hardhat],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_SEPOLIA_API_KEY! }),
    publicProvider(),
  ]
)
const appInfo = {
  appName: "Web3CrafterEscrow",
}

const { connectors } = getDefaultWallets({
  appName: appInfo.appName,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  chains: [sepolia, hardhat],
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export function WagmiRainbowProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={appInfo}
        theme={
          (darkTheme({
            borderRadius: "medium",
            accentColor: "#6C11D4",
          }),
          lightTheme({
            borderRadius: "medium",
            accentColor: "#862BEE",
          }))
        }
        coolMode
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
