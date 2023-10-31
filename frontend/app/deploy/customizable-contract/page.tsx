"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  TransactionReceiptNotFoundErrorType,
  UserRejectedRequestError,
} from "viem"
import { toast } from "sonner"

import { useAccount, useWaitForTransaction, useWalletClient } from "wagmi"
import { useIsMounted } from "@/hooks/useIsMounted"

import CustomizableEscrow from "@/artifacts/contracts/CustomizableEscrow.sol/CustomizableEscrow.json"
import { customizableContractAbi } from "@/constants/abi/abis"
import { storeCustomizableContractAddress } from "@/action/db/store-contract-address"
import { revalidatePagePath } from "@/action/revalidate-path"
import { ConfirmationButtonText, ContractCreation } from "@/types/types"

import { OverviewCard } from "@/app/deploy/customizable-contract/components/overview-card"
import { CreateCard } from "@/app/deploy/customizable-contract/components/create-card"

//TODO: Fix when metamask is canceled
const AdvancedContractPage = () => {
  const [contract, setContract] = useState<ContractCreation>({
    arbiters: [],
    managers: [],
    beneficiary: "",
    amount: "",
  })
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >()
  const [confirmationButtonText, setConfirmationButtonText] =
    useState<ConfirmationButtonText>("Deploy")
  const { isConnected, address: accountAddress } = useAccount()
  const isMounted = useIsMounted()
  const router = useRouter()
  const { data: walletClient } = useWalletClient()
  const { status: deploymentStatus } = useWaitForTransaction({
    hash: transactionHash,
    confirmations: 1,
    async onSuccess(data) {
      const contractAddress = data.contractAddress
      if (contractAddress) {
        const depositsArr =
          contract.amount === "" || contract.amount === "0"
            ? []
            : [accountAddress]

        const objToStore = {
          address: contractAddress,
          arbiters: contract.arbiters,
          managers: contract.managers,
          deposits: depositsArr,
          requests: [],
          approvals: [],
        }
        await storeCustomizableContractAddress(objToStore)

        toast.success("Contract Deployed", {
          description: `Contract Address: ${contractAddress}`,
        })

        setContract({
          beneficiary: "",
          arbiters: [],
          managers: [],
          amount: "",
        })
        await revalidatePagePath("/contracts")
        router.push(`/contract/customizable/${contractAddress}`)
        setConfirmationButtonText("Deploy")
      }
    },
    onError(e) {
      const error = e as TransactionReceiptNotFoundErrorType
      console.log("error:", error)
      setConfirmationButtonText("Deploy")

      toast.error(
        <div className="flex flex-col bg-red-500">
          <p>Error</p>
          <p>{error.shortMessage}</p>
        </div>
      )
    },
  })

  const deployContract = async () => {
    setConfirmationButtonText("Waiting for confirmation")
    try {
      if (!isConnected) return console.log("Not Connected")

      const escrowContract = await walletClient?.deployContract({
        abi: customizableContractAbi,
        account: accountAddress,
        args: [
          contract.arbiters as `0x${string}`[],
          contract.managers as `0x${string}`[],
          contract.beneficiary as `0x${string}`,
        ],
        bytecode: CustomizableEscrow.bytecode as `0x${string}`,
        value: BigInt(contract.amount),
      })
      setTransactionHash(escrowContract)
      setConfirmationButtonText("Transaction pending")
    } catch (e) {
      const error = e as UserRejectedRequestError
      if (error.shortMessage === "User rejected the request.") {
        setConfirmationButtonText("Deploy")
        toast.error("Transaction canceled")
      }
    }
  }

  if (!isMounted) return null
  return (
    <div className="container px-6 space-y-8 sm:px-8 md:flex md:space-x-2 lg:space-x-4 xl:space-x-8 md:space-y-0">
      <CreateCard
        contract={contract}
        setContract={setContract}
        className="w-full px-2 sm:px-8 xl:flex-1"
      />

      <OverviewCard
        contract={contract}
        setContract={setContract}
        deploymentStatus={deploymentStatus}
        deployContract={deployContract}
        confirmationButtonText={confirmationButtonText}
        className="w-full px-2 sm:px-8 md:w-fit"
      />
    </div>
  )
}
export default AdvancedContractPage
