"use client"
import { Dispatch, SetStateAction, useState } from "react"

import { useIsMounted } from "@/hooks/useIsMounted"

import { ConfirmationButtonText, ContractCreation } from "@/types/types"
import { SpinnerButton } from "@/components/spinner-button"
import { Card, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import BeneficiaryOverviewSection from "@/app/deploy/customizable-contract/components/overview/beneficiary-overview-section"
import ArbitersOverviewSection from "@/app/deploy/customizable-contract/components/overview/arbiters-overview-section"
import ManagersOverviewSection from "@/app/deploy/customizable-contract/components/overview/managers-overview-section"
import AmountOverviewSection from "@/app/deploy/customizable-contract/components/overview/amount-overview-section"
import { useAccount } from "wagmi"
import CustomConnectButton from "@/components/custom-connect-button"
import Web3Button from "@/components/web-3-button"

interface OverviewCardProps {
  contract: ContractCreation
  setContract: Dispatch<SetStateAction<ContractCreation>>
  deploymentStatus: "error" | "idle" | "success" | "loading"
  confirmationButtonText: ConfirmationButtonText
  deployContract: () => Promise<void>
  className?: string
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  contract,
  setContract,
  deployContract,
  className,
  deploymentStatus,
  confirmationButtonText,
}) => {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()
  const { beneficiary, arbiters, managers, amount } = contract

  const removeFromContract = (key: string, value?: string) => {
    if (key === "arbiters") {
      const newArbiters = arbiters.filter((arbiter) => {
        return arbiter !== value
      })

      setContract({
        ...contract,
        arbiters: newArbiters,
      })
    }

    if (key === "managers") {
      const newOwners = managers.filter((manager) => {
        return manager !== value
      })

      setContract({
        ...contract,
        managers: newOwners,
      })
    }

    if (key === "amount" || key === "beneficiary") {
      setContract({
        ...contract,
        [key]: "",
      })
    }
  }

  if (!isMounted) return null
  return (
    <Card className={cn("flex flex-col justify-between pb-12", className)}>
      <div className="py-12 space-y-12">
        <CardTitle>Contract Overview</CardTitle>
        <p className="text-lg">
          Customize your escrow contract with a wide range of options
        </p>

        <div className="flex flex-col gap-4">
          <BeneficiaryOverviewSection
            beneficiary={beneficiary}
            removeFromContract={removeFromContract}
          />
          <ArbitersOverviewSection
            arbiters={arbiters}
            removeFromContract={removeFromContract}
          />
          {managers.length > 0 && (
            <ManagersOverviewSection
              managers={managers}
              removeFromContract={removeFromContract}
            />
          )}
          {amount && (
            <AmountOverviewSection
              amount={amount}
              removeFromContract={removeFromContract}
            />
          )}
        </div>
      </div>
      {isConnected ? (
        <SpinnerButton
          disabled={
            deploymentStatus === "loading" ||
            beneficiary === "" ||
            arbiters.length === 0
          }
          loading={deploymentStatus === "loading"}
          className="w-full "
          onClick={deployContract}
          variant={"gradient"}
        >
          {confirmationButtonText}
        </SpinnerButton>
      ) : (
        <CustomConnectButton />
      )}
    </Card>
  )
}
