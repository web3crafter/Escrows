"use client"
import CardRow from "@/components/card-row"
import ETHLogo from "@/components/eth-logo"
import { useContractBalance } from "@/hooks/useContractBalance"

const ContractBalance = ({ contractAddress }: { contractAddress: string }) => {
  const { contractBalance } = useContractBalance(contractAddress)
  return (
    <CardRow
      label="Contract Balance"
      amount={contractBalance}
      icon={<ETHLogo />}
    />
  )
}
export default ContractBalance
