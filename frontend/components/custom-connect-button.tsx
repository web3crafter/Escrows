"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const CustomConnectButton = ({
  handleModalClose,
}: {
  handleModalClose?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        const handleClick = () => {
          if (!connected) {
            openConnectModal()
          } else if (connected) {
            openAccountModal()
          } else if (chain.unsupported) {
            openChainModal()
          }
        }

        return (
          <>
            {!connected ? (
              <Button
                className={cn(
                  "bg-gradient-to-r from-primary to-accent",
                  chain?.unsupported && "hidden"
                )}
                onClick={() => {
                  if (handleModalClose) {
                    handleModalClose(false)
                  }
                  openConnectModal()
                }}
              >
                Connect Wallet
              </Button>
            ) : (
              <Button
                className={cn(
                  "bg-gradient-to-r from-primary to-accent",
                  chain?.unsupported && "hidden"
                )}
                onClick={() => {
                  if (handleModalClose) {
                    handleModalClose(false)
                  }
                  openAccountModal()
                }}
              >
                {`${account.address.slice(0, 6)}...${account.address.slice(
                  account.address.length - 6
                )}`}
              </Button>
            )}
            {chain?.unsupported && (
              <Button
                className="bg-gradient-to-r from-primary to-accent"
                onClick={() => {
                  if (handleModalClose) {
                    handleModalClose(false)
                  }
                  openChainModal()
                }}
              >
                Wrong Network
              </Button>
            )}
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}
export default CustomConnectButton
