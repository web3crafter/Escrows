import { SpinnerButton } from "@/components/spinner-button"
import { standardContractAbi } from "@/constants/abi/abis"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { useStandardAccountRoles } from "@/hooks/useStandardAccountRoles"
import { toast } from "sonner"
import { formatEther } from "viem"
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi"

interface ApproveProps {
  contractAddress: string
  refetchIsApproved: () => void
}
const Approve = ({ contractAddress, refetchIsApproved }: ApproveProps) => {
  const { isArbiter } = useStandardAccountRoles(contractAddress)
  const { releasedAmount, refetch: refetchReleasedAmount } =
    useReleasedAmount(contractAddress)
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
