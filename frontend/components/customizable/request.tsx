"use client"

import { amountSchema } from "@/form-schema/schema"
import * as z from "zod"
import { useContractWrite, useWaitForTransaction } from "wagmi"
import { customizableContractAbi } from "@/constants/abi/abis"
import { revalidatePagePath } from "@/action/revalidate-path"
import { UserRejectedRequestError, parseEther } from "viem"
import { useRequestAmount } from "@/hooks/useRequestAmount"
import ConfirmModal from "@/components/confirm-modal"
import ConfirmAmountField from "@/components/input-form-fields/confirm-modal-fields/confirm-amount-field"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCustomizableAccountRoles } from "@/hooks/useCustomizableAccountRoles"
import { useContractBalance } from "@/hooks/useContractBalance"
import { handleModalState } from "@/lib/utils"
import { useValidatedForms } from "@/hooks/useValidatedForms"
import { ConfirmationButtonText } from "@/types/types"
import { toast } from "sonner"

interface RequestProps {
  contractAddress: `0x${string}`
}

const RequestETHAmount = ({ contractAddress }: RequestProps) => {
  const { amountForm } = useValidatedForms()

  const [open, setOpen] = useState(false)
  const [confirmationButtonText, setConfirmationButtonText] =
    useState<ConfirmationButtonText>("Request")
  const { isBeneficiary } = useCustomizableAccountRoles(contractAddress)
  const { refetch: refetchRequestAmount } = useRequestAmount(contractAddress)
  const { data: contractBalance } = useContractBalance(contractAddress)

  const { data: requestResult, write: writeRequest } = useContractWrite({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "requestReleaseAmount",
    onSuccess: () => setConfirmationButtonText("Transaction pending"),
    onError: (e) => {
      const error = e as UserRejectedRequestError
      if (error.shortMessage === "User rejected the request.") {
        setConfirmationButtonText("Request")
        toast.error("Transaction canceled")
      }
    },
  })

  const { status: requestedStatus } = useWaitForTransaction({
    hash: requestResult?.hash,
    confirmations: 1,
    onSuccess(txReceipt) {
      setConfirmationButtonText("Request")
      refetchRequestAmount()
      if (open) {
        handleModalState(amountForm, open, setOpen)
      }
      revalidatePagePath(`/contract/customizable/${contractAddress}`)
    },
  })

  const requestRelease = (value: z.infer<typeof amountSchema>) => {
    setConfirmationButtonText("Waiting for confirmation")
    writeRequest?.({
      args: [parseEther(amountForm.getValues("amount"))],
    })
  }
  return (
    <div>
      <ConfirmModal
        error={requestedStatus === "error"}
        heading="Request amount to release"
        open={open}
        onOpenChange={() => handleModalState(amountForm, open, setOpen)}
        trigger={
          <Button
            variant={isBeneficiary ? "gradient" : "outline"}
            disabled={!isBeneficiary}
          >
            {confirmationButtonText}
          </Button>
        }
      >
        <ConfirmAmountField
          amountForm={amountForm}
          loading={requestedStatus === "loading"}
          buttonLabel={confirmationButtonText}
          confirmAction={requestRelease}
          cancelAction={() => handleModalState(amountForm, open, setOpen)}
          maxAmountButton={true}
          maxAmount={contractBalance ? contractBalance.value : BigInt(0)}
        />
      </ConfirmModal>
    </div>
  )
}
export default RequestETHAmount
