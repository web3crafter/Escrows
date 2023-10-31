"use client"

import Web3Button from "@/components/web-3-button"
import { standardContractAbi } from "@/constants/abi/abis"
import { useContractBalance } from "@/hooks/useContractBalance"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { toast } from "sonner"

interface ApproveProps {
  contractAddress: string
  refetchIsApproved: () => void
}
const Approve = ({ contractAddress, refetchIsApproved }: ApproveProps) => {
  const { refetch: refetchReleasedAmount } = useReleasedAmount(contractAddress)
  const { contractBalance, refetch: refetchContractBalance } =
    useContractBalance(contractAddress)

  const onSuccess = () => {
    toast.success(`${contractBalance} released to beneficiary`)
    refetchReleasedAmount()
    refetchContractBalance()
    refetchIsApproved()
  }

  return (
    <Web3Button
      buttonLabel="Approve"
      variant={"gradient"}
      contractAddress={contractAddress}
      contractAbi={standardContractAbi}
      functionName="approve"
      className="w-full"
      onSuccess={onSuccess}
    />
  )
}
export default Approve
