"use client"
import ContractBalanceRow from "@/components/card-rows/contract-balance-row"
import ReleasedAmountRow from "@/components/card-rows/standard/released-amount-row"
import { useContractBalance } from "@/hooks/useContractBalance"

interface AmountSectionProps {
  contractAddress: string
}
const AmountSection = ({ contractAddress }: AmountSectionProps) => {
  const { contractBalance } = useContractBalance(contractAddress)

  return (
    <div>
      {Number(contractBalance) === 0 ? (
        <ReleasedAmountRow contractAddress={contractAddress} />
      ) : (
        <ContractBalanceRow contractAddress={contractAddress} />
      )}
    </div>
  )
}
export default AmountSection
