"use client"

import { SpinnerButton } from "@/components/spinner-button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Web3Button from "@/components/web-3-button"
import { standardContractAbi } from "@/constants/abi/abis"
import { amountSchema } from "@/form-schema/schema"
import { useContractBalance } from "@/hooks/useContractBalance"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { useStandardAccountRoles } from "@/hooks/useStandardAccountRoles"
import { useValidatedForms } from "@/hooks/useValidatedForms"
import { ConfirmationButtonText } from "@/types/types"
import { useState } from "react"
import { toast } from "sonner"
import { UserRejectedRequestError, parseEther } from "viem"
import { useContractWrite, useWaitForTransaction } from "wagmi"
import { z } from "zod"

interface DepositProps {
  contractAddress: string
  refetchIsApproved: () => void
}

//TODO: Fix layout change on input when waiting for confirmation
const Deposit = ({ contractAddress, refetchIsApproved }: DepositProps) => {
  const { isDeployer } = useStandardAccountRoles(contractAddress)
  const { amountForm } = useValidatedForms()
  const [txValue, setTXValue] = useState<bigint>(BigInt(0))
  const [confirmationButtonText, setConfirmationButtonText] =
    useState<ConfirmationButtonText>("Deposit")
  const { refetch: refetchContractBalance } =
    useContractBalance(contractAddress)
  const { refetch: refetchReleasedAmount } = useReleasedAmount(contractAddress)

  const { data: depositResult, write: writeDeposit } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
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

  const { status: depositedStatus } = useWaitForTransaction({
    hash: depositResult?.hash,
    confirmations: 1,
    onSuccess(data) {
      toast.success(`${amountForm.getValues("amount")} Deposited`)
      refetchIsApproved()
      refetchReleasedAmount()
      refetchContractBalance()
      amountForm.reset()
    },
  })

  const handleDeposit = (depositAmount: z.infer<typeof amountSchema>) => {
    setConfirmationButtonText("Waiting for confirmation")
    if (!isDeployer) {
      toast.error("Only the deployer of the contract can deposit funds")
    }
    writeDeposit?.({
      value: parseEther(depositAmount.amount),
    })
  }

  // const handleDeposit = (depositAmount: z.infer<typeof amountSchema>) => {
  //   setTXValue(parseEther(depositAmount.amount))
  // }

  const onSuccess = () => {
    toast.success(`${amountForm.getValues("amount")} Deposited`)
    refetchIsApproved()
    refetchReleasedAmount()
    refetchContractBalance()
    amountForm.reset()
  }
  return (
    <Form {...amountForm}>
      <form onSubmit={amountForm.handleSubmit(handleDeposit)} className="flex ">
        <FormField
          control={amountForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit amount</FormLabel>
              <div className="flex w-full space-x-1">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <SpinnerButton
                  type="submit"
                  variant={"gradient"}
                  loading={depositedStatus === "loading"}
                  disabled={
                    depositedStatus === "loading" ||
                    !isDeployer ||
                    amountForm.getValues("amount") === "" ||
                    amountForm.getValues("amount") === "0"
                  }
                >
                  {confirmationButtonText}
                </SpinnerButton>
                {/* <Web3Button
                  buttonLabel="Deposit"
                  buttonType="submit"
                  variant={"gradient"}
                  contractAddress={contractAddress}
                  contractAbi={standardContractAbi}
                  functionName="deposit"
                  txValue={txValue}
                  onSuccess={onSuccess}
                  isDisabled={
                    !isDeployer ||
                    amountForm.getValues("amount") === "" ||
                    amountForm.getValues("amount") === "0"
                  }
                /> */}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
export default Deposit
