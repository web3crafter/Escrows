"use client"

import { ICustomizableEscrow } from "@/types/types"

import { Card } from "@/components/ui/card"
import ContractAddressSection from "@/app/contracts/components/contract-address-section"
import AddressArraySection from "@/app/contracts/components/customizable/address-array-section"
import { Separator } from "@/components/ui/separator"
import ActionSection from "@/app/contracts/components/customizable/action-section"
import { cn } from "@/lib/utils"
import RecipientRow from "@/components/card-rows/recipient-row"
import RequestedAmountRow from "@/components/card-rows/customizable/requested-amount-row"
import ContractBalanceRow from "@/components/card-rows/contract-balance-row"
import OwnerRow from "@/components/card-rows/owner-row"

interface CustomizableContractCardProps {
  contract: ICustomizableEscrow
  className?: string
}

const CustomizableContractCard: React.FC<CustomizableContractCardProps> = ({
  contract,
  className,
}) => {
  const {
    contractAddress,
    deployer,
    beneficiary,
    arbiters,
    managers,
    approvals,
    deposits,
  } = contract

  if (!contract) return null

  return (
    <Card key={contractAddress} className={cn("py-8 space-y-8 ", className)}>
      <ContractAddressSection
        contractAddress={contractAddress}
        contractType="customizable"
      />

      <div className="space-y-4 ">
        <RecipientRow beneficiary={beneficiary} />
        <RequestedAmountRow contractAddress={contractAddress} />
      </div>

      <Separator />

      <div className="space-y-4">
        <ContractBalanceRow contractAddress={contractAddress} />
        <OwnerRow owner={deployer} />
      </div>

      <Separator />

      <div className="flex justify-between">
        <AddressArraySection addressList={managers} listType="managers" />
        <AddressArraySection addressList={arbiters} listType="arbiters" />
      </div>

      <ActionSection
        contractAddress={contractAddress}
        beneficiary={beneficiary}
      />
    </Card>
  )
}
export default CustomizableContractCard
