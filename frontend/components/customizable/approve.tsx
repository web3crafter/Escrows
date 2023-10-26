"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatEther, parseEther } from "viem"
import { set, useForm } from "react-hook-form"
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi"

import { updateApprovals } from "@/action/db/customizable/approvals"
import { revalidatePagePath } from "@/action/revalidate-path"

import { customizableContractAbi } from "@/constants/abi/abis"
import { amountSchema } from "@/form-schema/schema"
import ConfirmModal from "@/components/confirm-modal"

import { useState } from "react"
import { useCustomizableAccountRoles } from "@/hooks/useCustomizableAccountRoles"
import { Button } from "@/components/ui/button"
import { useContractBalance } from "@/hooks/useContractBalance"
import { useRequestAmount } from "@/hooks/useRequestAmount"
import { useTotalReleasedAmount } from "@/hooks/useTotalReleasedAmount"
import { useBeneficiaryBalance } from "@/hooks/useBeneficiaryBalance"
import ConfirmAmountField from "@/components/input-form-fields/confirm-modal-fields/confirm-amount-field"
import { handleModalState } from "@/lib/utils"

interface ApproveProps {
  contractAddress: `0x${string}`
  beneficiary: string
}

const Approve = ({ contractAddress, beneficiary }: ApproveProps) => {
  const [open, setOpen] = useState(false)
  const { isArbiter } = useCustomizableAccountRoles(contractAddress)
  const { refetch: refetchContractBalance } =
    useContractBalance(contractAddress)
  const { refetch: refetchTotalReleasedAmount } =
    useTotalReleasedAmount(contractAddress)

  const amountForm = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: "",
    },
  })

  const { address: accountAddress } = useAccount()
  const { data: requestAmount, refetch: refetchRequestAmount } =
    useRequestAmount(contractAddress)
  const { refetch: refetchBeneficiaryBalance } =
    useBeneficiaryBalance(beneficiary)
  const { data: approveResult, write: writeApprove } = useContractWrite({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "approveRequestAmount",
  })

  const { status: approvedStatus } = useWaitForTransaction({
    hash: approveResult?.hash,
    confirmations: 1,
    onSuccess(txReceipt) {
      updateApprovals(contractAddress, accountAddress as string)
      refetchContractBalance()
      refetchTotalReleasedAmount()
      refetchBeneficiaryBalance()
      refetchRequestAmount()
      handleModalState(amountForm, open, setOpen)
      revalidatePagePath(`/contract/customizable/${contractAddress}`)
      console.log("Approved Success")
    },
  })

  const approveRequest = () => {
    writeApprove?.({ args: [parseEther(amountForm.getValues("amount"))] })
  }

  const formattedRequestAmount = requestAmount && formatEther(requestAmount)
  return (
    <div className="flex">
      <ConfirmModal
        error={approvedStatus === "error"}
        open={open}
        onOpenChange={() => handleModalState(amountForm, open, setOpen)}
        heading="Approve amount to release"
        trigger={
          <Button
            variant={isArbiter ? "gradient" : "outline"}
            className="w-full"
            disabled={!isArbiter || formattedRequestAmount === "0"}
          >
            Approve
          </Button>
        }
      >
        <ConfirmAmountField
          amountForm={amountForm}
          loading={approvedStatus === "loading"}
          confirmAction={approveRequest}
          cancelAction={() => handleModalState(amountForm, open, setOpen)}
          maxAmountButton={true}
          maxAmount={requestAmount}
        />
      </ConfirmModal>
    </div>
  )
}
export default Approve
