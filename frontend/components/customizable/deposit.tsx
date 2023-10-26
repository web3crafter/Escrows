"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { parseEther } from "viem"

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

interface DepositProps {
  contractAddress: `0x${string}`
}
const Deposit = ({ contractAddress }: DepositProps) => {
  const [open, setOpen] = useState(false)
  const { address: accountAddress } = useAccount()
  const { isArbiter, isBeneficiary, isDeployer, isManager } =
    useCustomizableAccountRoles(contractAddress)
  const { refetch: refetchContractBalance } =
    useContractBalance(contractAddress)
  const amountForm = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: "",
    },
  })
  const { data: depositResult, write: writeDeposit } = useContractWrite({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "deposit",
  })

  const { status: depositedStatus, error: depositedError } =
    useWaitForTransaction({
      hash: depositResult?.hash,
      confirmations: 1,
      onSuccess(data) {
        updateDeposits(contractAddress, accountAddress as string)
        refetchContractBalance()
        handleModalState(amountForm, open, setOpen)
        revalidatePagePath(`/contract/customizable/${contractAddress}`)
        console.log("Deposit Success")
      },
    })

  const deposit = (value: z.infer<typeof amountSchema>) => {
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
            Deposit
          </Button>
        }
      >
        <ConfirmAmountField
          amountForm={amountForm}
          confirmAction={deposit}
          cancelAction={() => handleModalState(amountForm, open, setOpen)}
          loading={depositedStatus === "loading"}
        />
      </ConfirmModal>
    </div>
  )
}
export default Deposit
