"use client"

import { amountSchema } from "@/form-schema/schema"
import * as z from "zod"
import { useContractWrite, useWaitForTransaction } from "wagmi"
import { customizableContractAbi } from "@/constants/abi/abis"
import { revalidatePagePath } from "@/action/revalidate-path"
import { parseEther } from "viem"
import { useRequestAmount } from "@/hooks/useRequestAmount"
import ConfirmModal from "@/components/confirm-modal"
import ConfirmAmountField from "@/components/input-form-fields/confirm-modal-fields/confirm-amount-field"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCustomizableAccountRoles } from "@/hooks/useCustomizableAccountRoles"
import { useContractBalance } from "@/hooks/useContractBalance"
import { handleModalState } from "@/lib/utils"
import { useValidatedForms } from "@/hooks/useValidatedForms"

interface RequestProps {
  contractAddress: `0x${string}`
}

const RequestETHAmount = ({ contractAddress }: RequestProps) => {
  const { amountForm } = useValidatedForms()

  const [open, setOpen] = useState(false)
  const { isBeneficiary } = useCustomizableAccountRoles(contractAddress)
  const { refetch: refetchRequestAmount } = useRequestAmount(contractAddress)
  const { data: contractBalance } = useContractBalance(contractAddress)

  const { data: requestResult, write: writeRequest } = useContractWrite({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "requestReleaseAmount",
  })

  const { status: requestedStatus } = useWaitForTransaction({
    hash: requestResult?.hash,
    confirmations: 1,
    onSuccess(txReceipt) {
      refetchRequestAmount()
      if (open) {
        handleModalState(amountForm, open, setOpen)
      }
      revalidatePagePath(`/contract/customizable/${contractAddress}`)
      console.log("Request Success")
    },
  })

  const requestRelease = (value: z.infer<typeof amountSchema>) => {
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
            Request
          </Button>
        }
      >
        <ConfirmAmountField
          amountForm={amountForm}
          loading={requestedStatus === "loading"}
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
