"use client"

import { IEscrow } from "@/types/types"

import { Card } from "@/components/ui/card"
import ContractAddressSection from "@/app/contracts/components/contract-address-section"
import { cn } from "@/lib/utils"
import ActionSection from "@/components/standard/action-section/action-section"
import DeployerSection from "@/components/standard/deployer-section"
import ArbiterSection from "@/components/standard/arbiter-section"
import BeneficiarySection from "@/components/standard/beneficiary-section"

interface StandardContractCardProps {
  contract: IEscrow
  className?: string
}

const StandardContractCard: React.FC<StandardContractCardProps> = ({
  contract,
  className,
}) => {
  const { deployer, arbiter, beneficiary, contractAddress } = contract

  if (!contract) return null

  return (
    <Card
      key={contractAddress}
      className={cn(
        "py-8 justify-between h-full px-2 sm:px-8 flex flex-col",
        className
      )}
    >
      <div className="space-y-4">
        <ContractAddressSection
          contractAddress={contractAddress}
          contractType="standard"
        />
        <DeployerSection
          deployer={deployer}
          contractAddress={contractAddress}
        />
        <ArbiterSection arbiter={arbiter} contractAddress={contractAddress} />
        <BeneficiarySection
          beneficiary={beneficiary}
          contractAddress={contractAddress}
        />
      </div>
      <ActionSection contractAddress={contractAddress} />
    </Card>
  )
}
export default StandardContractCard
