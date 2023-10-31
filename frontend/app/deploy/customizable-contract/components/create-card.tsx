"use client"
import { parseEther } from "viem"
import { Dispatch, SetStateAction } from "react"
import * as z from "zod"

import { addressSchema, amountSchema } from "@/form-schema/schema"
import { cn } from "@/lib/utils"
import { ContractCreation } from "@/types/types"
import { useIsMounted } from "@/hooks/useIsMounted"
import { useValidatedForms } from "@/hooks/useValidatedForms"

import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AmountField from "@/components/input-form-fields/amount-field"
import AddressField from "@/components/input-form-fields/address-field"

interface CreateCardProps {
  contract: ContractCreation
  setContract: Dispatch<SetStateAction<ContractCreation>>
  className?: string
}
export const CreateCard: React.FC<CreateCardProps> = ({
  contract,
  setContract,
  className,
}) => {
  const { beneficiary, arbiters, managers, amount } = contract
  const { amountForm, arbiterForm, managerForm, beneficiaryForm } =
    useValidatedForms()
  const isMounted = useIsMounted()

  const addBeneficiary = (value: z.infer<typeof addressSchema>) => {
    setContract({
      ...contract,
      beneficiary: value.address as `0x${string}`,
    })
    beneficiaryForm.reset()
  }

  const addAmount = (value: z.infer<typeof amountSchema>) => {
    setContract({
      ...contract,
      amount: parseEther(value.amount).toString(),
    })
    amountForm.resetField("amount")
  }

  const addArbiter = (value: z.infer<typeof addressSchema>) => {
    if (arbiters.includes(value.address)) {
      console.log("Address already added as an arbiter")
    } else {
      setContract({
        ...contract,
        arbiters: [...contract.arbiters, value.address as `0x${string}`],
      })
    }
    arbiterForm.reset()
  }

  const addManager = (value: z.infer<typeof addressSchema>) => {
    if (managers.includes(value.address)) {
      console.log("Address already added as an manager")
    } else {
      setContract({
        ...contract,
        managers: [...contract.managers, value.address as `0x${string}`],
      })
    }
    managerForm.reset()
  }

  if (!isMounted) return null

  return (
    <Card className={cn("py-12 space-y-12", className)}>
      <CardTitle>Create Contract</CardTitle>
      <p className="text-lg">
        Customize your escrow contract with a wide range of options
      </p>
      <div className="space-y-12">
        <div className="space-y-8">
          <div className="space-y-8 lg:space-y-0 lg:gap-5 lg:flex ">
            <AddressField
              addressForm={beneficiaryForm}
              addAction={addBeneficiary}
              disabled={beneficiary !== ""}
              label="Beneficiary of this contract"
              optionalOrRequiredLabel="required"
              className="lg:flex-1"
            />
            <AddressField
              addressForm={arbiterForm}
              addAction={addArbiter}
              label="Arbiters of this contract"
              optionalOrRequiredLabel="required, one or more"
              className="lg:flex-1"
            />
          </div>
          <div className="space-y-8 lg:space-y-0 lg:gap-5 lg:flex">
            <AddressField
              addressForm={managerForm}
              addAction={addManager}
              label="Managers of this contract"
              optionalOrRequiredLabel="optional, one or more"
              className="lg:flex-1"
            />

            <AmountField
              amountForm={amountForm}
              confirmAction={addAmount}
              className="lg:flex-1"
              amount={amount}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => {
              arbiterForm.reset()
              beneficiaryForm.reset()
              amountForm.reset()
              managerForm.reset()
            }}
            className="mt-5"
          >
            Reset all fields
          </Button>
        </div>
      </div>
    </Card>
  )
}
