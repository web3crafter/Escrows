"use client"

import ArbitersComponent from "@/app/contract/customizable/[address]/components/contract-section/arbiters-component"
import BeneficiaryComponent from "@/app/contract/customizable/[address]/components/contract-section/beneficiary-component"
import ManagersComponent from "@/app/contract/customizable/[address]/components/contract-section/managers-component"
import ContractBalanceRow from "@/components/card-rows/contract-balance-row"
import RequestedAmountRow from "@/components/card-rows/customizable/requested-amount-row"
import OwnerRow from "@/components/card-rows/owner-row"
import RequestETHAmount from "@/components/customizable/request"
import { cn } from "@/lib/utils"

interface ContractSectionProps {
  contractAddress: string
  deployer: string
  beneficiary: string
  arbiters: string[]
  managers: string[]
  className?: string
}
const ContractSection = ({
  contractAddress,
  deployer,
  beneficiary,
  arbiters,
  managers,
  className,
}: ContractSectionProps) => {
  return (
    <div className={cn("flex flex-col px-4 py-6 md:px-8 gap-8", className)}>
      <BeneficiaryComponent
        contractAddress={contractAddress}
        beneficiaryAddress={beneficiary}
      />

      <ContractBalanceRow contractAddress={contractAddress} />

      <OwnerRow owner={deployer} />

      <RequestedAmountRow contractAddress={contractAddress} />

      <div className="flex flex-col gap-8">
        <ManagersComponent
          managers={managers}
          contractAddress={contractAddress as `0x${string}`}
        />

        <ArbitersComponent
          arbiters={arbiters}
          contractAddress={contractAddress as `0x${string}`}
        />
      </div>
      <div className="mx-auto mt-8">
        <RequestETHAmount contractAddress={contractAddress as `0x${string}`} />
      </div>
    </div>
  )
}
export default ContractSection
