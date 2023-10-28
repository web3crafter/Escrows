"use client"

import { SpinnerButton } from "@/components/spinner-button"
import { standardContractAbi } from "@/constants/abi/abis"
import { useContractBalance } from "@/hooks/useContractBalance"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { useStandardAccountRoles } from "@/hooks/useStandardAccountRoles"
import { useValidatedForms } from "@/hooks/useValidatedForms"
import { toast } from "sonner"
import { formatEther } from "viem"
import { useContractWrite, useWaitForTransaction } from "wagmi"

interface ApproveProps {
  contractAddress: string
  refetchIsApproved: () => void
}
const Approve = ({ contractAddress, refetchIsApproved }: ApproveProps) => {
  const { isArbiter } = useStandardAccountRoles(contractAddress)
  const { releasedAmount, refetch: refetchReleasedAmount } =
    useReleasedAmount(contractAddress)
  const { contractBalance, refetch: refetchContractBalance } =
    useContractBalance(contractAddress)

  const { data: approveResult, write: writeApprove } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
    functionName: "approve",
  })

  const { status: approvedStatus } = useWaitForTransaction({
    hash: approveResult?.hash,
    confirmations: 1,
    onSuccess(data) {
      toast.success(`${contractBalance} released to beneficiary`)
      refetchReleasedAmount()
      refetchContractBalance()
      refetchIsApproved()
    },
  })
  return (
    <SpinnerButton
      loading={approvedStatus === "loading"}
      disabled={approvedStatus === "loading" || !isArbiter}
      className="w-full"
      variant={"gradient"}
      onClick={() => {
        writeApprove?.()
      }}
    >
      Approve
    </SpinnerButton>
  )
}
export default Approve
