"use client"
import { SpinnerButton } from "@/components/spinner-button"
import { Button } from "@/components/ui/button"
import { standardContractAbi } from "@/constants/abi/abis"
import { useIsApproved } from "@/hooks/useIsApproved"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { useStandardAccountRoles } from "@/hooks/useStandardAccountRoles"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { formatEther } from "viem"
import { useContractWrite, useWaitForTransaction } from "wagmi"

interface ApproveSectionProps {
  contractAddress: string
}
const ApproveSection = ({ contractAddress }: ApproveSectionProps) => {
  const { isArbiter } = useStandardAccountRoles(contractAddress)
  const { releasedAmount, refetch: refetchReleasedAmount } =
    useReleasedAmount(contractAddress)
  const { data: isApproved, refetch: refetchIsApproved } =
    useIsApproved(contractAddress)

  const { data: approveResult, write: writeApprove } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
    functionName: "approve",
  })

  const { status: approvedStatus } = useWaitForTransaction({
    hash: approveResult?.hash,
    confirmations: 1,
    onSuccess(data) {
      refetchIsApproved()
      toast.success(`${formatEther(releasedAmount)} released to beneficiary`)
      refetchReleasedAmount()
    },
  })

  const approve = () => {
    if (!isArbiter) {
      toast("Only the arbiter can approve a transaction")
    }
    writeApprove?.()
  }
  return (
    <div>
      {isArbiter ? (
        <SpinnerButton
          variant={"gradient"}
          className="w-full text-base"
          disabled={approvedStatus === "loading" || isApproved}
          loading={approvedStatus === "loading"}
          onClick={approve}
        >
          Approve{isApproved && "d"}
        </SpinnerButton>
      ) : (
        <Button
          className={cn(
            isApproved ? "text-green-500" : "text-orange-500",
            "w-full text-base disabled:opacity-100"
          )}
          disabled
          variant={"ghost"}
        >
          {!isApproved ? "Waiting for arbiter to approve" : "Approved"}
        </Button>
      )}
    </div>
  )
}
export default ApproveSection
