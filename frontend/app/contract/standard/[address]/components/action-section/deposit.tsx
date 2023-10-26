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
import { standardContractAbi } from "@/constants/abi/abis"
import { amountSchema } from "@/form-schema/schema"
import { useContractBalance } from "@/hooks/useContractBalance"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { useStandardAccountRoles } from "@/hooks/useStandardAccountRoles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { formatEther, parseEther } from "viem"
import { useContractWrite, useWaitForTransaction } from "wagmi"
import { z } from "zod"

interface DepositProps {
  contractAddress: string
  refetchIsApproved: () => void
}
const Deposit = ({ contractAddress, refetchIsApproved }: DepositProps) => {
  const { refetch: refetchContractBalance } =
    useContractBalance(contractAddress)
  const { releasedAmount } = useReleasedAmount(contractAddress)
  const { isDeployer } = useStandardAccountRoles(contractAddress)
  const amountForm = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: formatEther(releasedAmount),
    },
  })

  const { data: depositResult, write: writeDeposit } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
    functionName: "deposit",
  })

  const { status: depositedStatus } = useWaitForTransaction({
    hash: depositResult?.hash,
    confirmations: 1,
    onSuccess(data) {
      toast.success(`${amountForm.getValues("amount")} Deposited`)
      refetchContractBalance()
      refetchIsApproved()
      amountForm.reset()
    },
  })

  const handleDeposit = (depositAmount: z.infer<typeof amountSchema>) => {
    if (!isDeployer) {
      toast.error("Only the deployer of the contract can deposit funds")
    }
    writeDeposit?.({
      value: parseEther(depositAmount.amount),
    })
  }
  return (
    <Form {...amountForm}>
      <form onSubmit={amountForm.handleSubmit(handleDeposit)} className="flex ">
        <FormField
          control={amountForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit with same amount or new amount</FormLabel>
              <div className="flex w-full space-x-1">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <SpinnerButton
                  type="submit"
                  variant={"gradient"}
                  loading={depositedStatus === "loading"}
                  disabled={depositedStatus === "loading" || !isDeployer}
                >
                  {`Deposit ${amountForm.getValues("amount")} ETH`}
                </SpinnerButton>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
export default Deposit
