"use client"

import { z } from "zod"
import { UserRejectedRequestError, parseEther } from "viem"

import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi"

import { customizableContractAbi } from "@/constants/abi/abis"
import { updateDeposits } from "@/action/db/customizable/deposits"
import { revalidatePagePath } from "@/action/revalidate-path"
import { amountSchema } from "@/form-schema/schema"
import { useContractBalance } from "@/hooks/useContractBalance"

import ConfirmModal from "@/components/confirm-modal"
import ConfirmAmountField from "@/components/input-form-fields/confirm-modal-fields/confirm-amount-field"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCustomizableAccountRoles } from "@/hooks/useCustomizableAccountRoles"
import { handleModalState } from "@/lib/utils"
import { useValidatedForms } from "@/hooks/useValidatedForms"
import { ConfirmationButtonText } from "@/types/types"
import { toast } from "sonner"

interface DepositProps {
  contractAddress: `0x${string}`
}
const Deposit = ({ contractAddress }: DepositProps) => {
  const [open, setOpen] = useState(false)
  const { address: accountAddress } = useAccount()
  const [confirmationButtonText, setConfirmationButtonText] =
    useState<ConfirmationButtonText>("Deposit")
  const { isArbiter, isBeneficiary, isDeployer, isManager } =
    useCustomizableAccountRoles(contractAddress)
  const { refetch: refetchContractBalance } =
    useContractBalance(contractAddress)
  const { amountForm } = useValidatedForms()

  const { data: depositResult, write: writeDeposit } = useContractWrite({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "deposit",
    onSuccess: () => setConfirmationButtonText("Transaction pending"),
    onError: (e) => {
      const error = e as UserRejectedRequestError
      if (error.shortMessage === "User rejected the request.") {
        setConfirmationButtonText("Deposit")
        toast.error("Transaction canceled")
      }
    },
  })

  const { status: depositedStatus, error: depositedError } =
    useWaitForTransaction({
      hash: depositResult?.hash,
      confirmations: 1,
      onSuccess(data) {
        toast.success(`${amountForm.getValues("amount")} Deposited`)
        setConfirmationButtonText("Deposit")
        updateDeposits(contractAddress, accountAddress as string)
        refetchContractBalance()
        if (open) {
          handleModalState(amountForm, open, setOpen)
        }
        revalidatePagePath(`/contract/customizable/${contractAddress}`)
        amountForm.reset()
      },
    })

  const deposit = (value: z.infer<typeof amountSchema>) => {
    setConfirmationButtonText("Waiting for confirmation")
    writeDeposit?.({
      value: parseEther(value.amount),
    })
  }

  return (
    <div>
      <ConfirmModal
        error={depositedStatus === "error"}
        heading="Deposit ETH to the contract"
        open={open}
        onOpenChange={() => handleModalState(amountForm, open, setOpen)}
        trigger={
          <Button
            className="w-full"
            variant={
              !isDeployer && !isArbiter && !isManager && !isBeneficiary
                ? "gradient"
                : "outline"
            }
          >
            {confirmationButtonText}
          </Button>
        }
      >
        <ConfirmAmountField
          amountForm={amountForm}
          confirmAction={deposit}
          buttonLabel={confirmationButtonText}
          cancelAction={() => handleModalState(amountForm, open, setOpen)}
          loading={depositedStatus === "loading"}
        />
      </ConfirmModal>
    </div>
  )
}
export default Deposit
