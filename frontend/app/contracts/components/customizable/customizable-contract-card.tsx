"use client"

import { ICustomizableEscrow } from "@/types/types"

import { Card } from "@/components/ui/card"
import ContractAddressSection from "@/app/contracts/components/contract-address-section"
import AddressArraySection from "@/app/contracts/components/customizable/address-array-section"
import ContractBalance from "@/components/card-rows/contract-balance"
import ContractOwner from "@/components/card-rows/contract-owner"
import ContractRecipient from "@/components/card-rows/contract-recipient"
import { Separator } from "@/components/ui/separator"
import ActionSection from "@/app/contracts/components/customizable/action-section"
import RequestedAmount from "@/components/card-rows/customizable/requested-amount"
import { cn } from "@/lib/utils"

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
        <ContractRecipient beneficiary={beneficiary} />
        <RequestedAmount contractAddress={contractAddress} />
      </div>

      <Separator />

      <div className="space-y-4">
        <ContractBalance contractAddress={contractAddress} />
        <ContractOwner owner={deployer} />
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
