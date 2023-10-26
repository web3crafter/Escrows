"use client"
import { useState } from "react"

import { IEscrow } from "@/types/types"

import { Card } from "@/components/ui/card"
import { useIsMounted } from "@/hooks/useIsMounted"
import ContractAddressSection from "@/app/contracts/components/contract-address-section"
import DeployerSection from "@/app/contracts/components/standard/deployer-section"
import ArbiterSection from "@/app/contracts/components/standard/arbiter-section"
import BeneficiarySection from "@/app/contracts/components/standard/beneficiary-section"
import ApproveSection from "@/app/contracts/components/standard/approve-section"
import { cn } from "@/lib/utils"

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
    <Card key={contractAddress} className={cn("py-8 space-y-4", className)}>
      <ContractAddressSection
        contractAddress={contractAddress}
        contractType="standard"
      />
      <DeployerSection deployer={deployer} contractAddress={contractAddress} />
      <ArbiterSection arbiter={arbiter} contractAddress={contractAddress} />
      <BeneficiarySection
        beneficiary={beneficiary}
        contractAddress={contractAddress}
      />
      <ApproveSection contractAddress={contractAddress} />
    </Card>
  )
}
export default StandardContractCard
