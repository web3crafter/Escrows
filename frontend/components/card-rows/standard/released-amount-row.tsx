"use client"
import CardRow from "@/components/card-row"
import ETHLogo from "@/components/eth-logo"
import { useContractBalance } from "@/hooks/useContractBalance"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { formatEther } from "viem"

const ReleasedAmountRow = ({
  contractAddress,
}: {
  contractAddress: string
}) => {
  const { releasedAmount } = useReleasedAmount(contractAddress)
  return (
    <CardRow
      label="Released Amount"
      amount={formatEther(releasedAmount)}
      icon={<ETHLogo />}
    />
  )
}
export default ReleasedAmountRow
