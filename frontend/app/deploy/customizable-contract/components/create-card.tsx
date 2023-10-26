"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseEther } from "viem"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Dispatch, SetStateAction } from "react"

import {
  addressSchema,
  amountSchema,
  arbiterSchema,
  beneficiarySchema,
  managerSchema,
} from "@/form-schema/schema"
import { useIsMounted } from "@/hooks/useIsMounted"

import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContractCreation } from "@/types/types"
import BeneficiaryField from "@/components/input-form-fields/beneficiary-field"
import ArbiterField from "@/components/input-form-fields/arbiter-field"
import ManagerField from "@/components/input-form-fields/manager-field"
import AmountField from "@/components/input-form-fields/amount-field"
import { cn } from "@/lib/utils"
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
  const isMounted = useIsMounted()

  const managerForm = useForm<z.infer<typeof managerSchema>>({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      address: "",
    },
  })
  const arbiterForm = useForm<z.infer<typeof arbiterSchema>>({
    resolver: zodResolver(arbiterSchema),
    defaultValues: {
      address: "",
    },
  })
  const beneficiaryForm = useForm<z.infer<typeof beneficiarySchema>>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: {
      address: "",
    },
  })

  const amountForm = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: "",
    },
  })

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
    },
  })

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
    if (contract.arbiters.includes(value.address)) {
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
    if (contract.managers.includes(value.address)) {
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
  //TODO: use one field for, all addresses?
  return (
    <Card className={cn("py-12 space-y-12", className)}>
      <CardTitle>Create Contract</CardTitle>
      <p className="text-lg">
        Customize your escrow contract with a wide range of options
      </p>
      <div className="space-y-12">
        <div className="space-y-8">
          <div className="space-y-8 lg:space-y-0 lg:gap-5 lg:flex ">
            {/* <AddressField
              addressForm={addressForm}
              addAction={addBeneficiary}
              disabled={beneficiary !== ""}
              label="Beneficiary of this contract"
              optionalOrRequiredLabel="required"
              className="lg:flex-1"
            />
            <AddressField
              addressForm={addressForm}
              addAction={addArbiter}
              label="Arbiters of this contract"
              optionalOrRequiredLabel="one or more required"
              className="lg:flex-1"
            /> */}
            <BeneficiaryField
              beneficiary={beneficiary}
              beneficiaryForm={beneficiaryForm}
              addBeneficiary={addBeneficiary}
              className="lg:flex-1"
            />
            <ArbiterField
              arbiterForm={arbiterForm}
              addArbiter={addArbiter}
              className="lg:flex-1"
            />
          </div>
          <div className="space-y-8 lg:space-y-0 lg:gap-5 lg:flex">
            {/* <AddressField
              addressForm={addressForm}
              addAction={addManager}
              label="Managers of this contract"
              optionalOrRequiredLabel="one or more optional"
              className="lg:flex-1"
            /> */}
            <ManagerField
              managerForm={managerForm}
              addManager={addManager}
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
