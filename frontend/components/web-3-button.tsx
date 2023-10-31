"use client"

import CustomConnectButton from "@/components/custom-connect-button"
import { SpinnerButton } from "@/components/spinner-button"
import { Button, ButtonProps } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Abi,
  Narrow,
  TransactionReceiptNotFoundErrorType,
  UserRejectedRequestError,
} from "viem"
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi"

interface Web3ButtonProps extends ButtonProps {
  buttonLabel: string
  contractAddress: string
  contractAbi: Narrow<readonly unknown[] | Abi>
  functionName: string
  buttonType?: "button" | "submit" | "reset"
  onSubmit?: () => void
  onSuccess?: () => void
  onError?: () => void
  isDisabled?: boolean
  isLoading?: boolean
  txValue?: bigint
  args?: []
}
const Web3Button = ({
  buttonLabel,
  buttonType = "button",
  contractAddress,
  functionName,
  contractAbi,
  onSubmit,
  onSuccess,
  onError,
  isDisabled,
  isLoading,
  txValue,
  args,
  ...props
}: Web3ButtonProps) => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const {
    chains,
    switchNetwork,
    status: switchNetworkStatus,
  } = useSwitchNetwork({
    onSuccess: () => setConfirmStatus("idle"),
    onError: () => setConfirmStatus("idle"),
  })
  const [confirmStatus, setConfirmStatus] = useState<"idle" | "waiting">("idle")
  const [buttonText, setButtonText] = useState(buttonLabel)
  const isMisMatch = chain?.unsupported

  const { data, write } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: contractAbi,
    functionName: functionName,
    onSuccess: () => setButtonText("Transaction pending"),
    onError: (e) => {
      const error = e as UserRejectedRequestError
      if (error.shortMessage === "User rejected the request.") {
        setButtonText(buttonLabel)
        toast.error("User Rejected Transaction")
      }
    },
  })

  const { data: transactionReceipt, status: transactionStatus } =
    useWaitForTransaction({
      hash: data?.hash,
      onSuccess(data) {
        onSuccess && onSuccess()
      },
      onError(e) {
        const error = e as TransactionReceiptNotFoundErrorType
        console.log("error:", error.shortMessage)
        setButtonText(buttonLabel)

        toast.error(
          <div className="flex flex-col bg-red-500">
            <p>Error</p>
            <p>{error.shortMessage}</p>
          </div>
        )
      },
    })

  const handleSwitchChain = () => {
    if (chain?.id) {
      setConfirmStatus("waiting")
      try {
        chains.map((x) => {
          x.id === 11155111 && switchNetwork?.(x.id)
        })
      } catch (error) {
        console.log("error:", error)
        setConfirmStatus("idle")
      }
    }
  }

  const handleTransactionAction = () => {
    setButtonText("Waiting for confirmation")
    if (txValue) {
      write?.({
        value: txValue,
      })
    }
    if (args) {
      write?.({
        args: args,
      })
    }
    write?.()
  }

  useEffect(() => {
    if (transactionStatus === "loading") {
      setButtonText("Transaction pending")
    }
  }, [transactionStatus])

  if (!isConnected) {
    return <CustomConnectButton />
  }

  if (isMisMatch) {
    return (
      <Button onClick={handleSwitchChain} variant={"gradient"} {...props}>
        {confirmStatus === "waiting" ? (
          <Loader2 className="w-7 h-7 animate-spin" />
        ) : (
          "Switch Network"
        )}
      </Button>
    )
  } else {
    return (
      <SpinnerButton
        type={buttonType}
        loading={transactionStatus === "loading" || isLoading}
        disabled={transactionStatus === "loading" || isDisabled}
        onClick={handleTransactionAction}
        {...props}
      >
        {buttonText}
      </SpinnerButton>
    )
  }
}

export default Web3Button
