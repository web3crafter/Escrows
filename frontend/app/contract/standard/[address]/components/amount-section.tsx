"use client"
import CardRow from "@/components/card-row"
import ContractBalance from "@/components/card-rows/contract-balance"
import ContractReleasedAmount from "@/components/card-rows/standard/contract-released-amount"
import ETHLogo from "@/components/eth-logo"
import { useContractBalance } from "@/hooks/useContractBalance"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { formatEther } from "viem"

interface AmountSectionProps {
  contractAddress: string
}
const AmountSection = ({ contractAddress }: AmountSectionProps) => {
  const { contractBalance } = useContractBalance(contractAddress)

  return (
    <div>
      {Number(contractBalance) === 0 ? (
        <ContractReleasedAmount contractAddress={contractAddress} />
      ) : (
        <ContractBalance contractAddress={contractAddress} />
      )}
    </div>
  )
}
export default AmountSection
