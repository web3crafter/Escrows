"use client"

import {
  CreateStandardContractSchema,
  addressSchema,
  amountSchema,
} from "@/form-schema/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const useValidatedForms = () => {
  const amountForm = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: "",
    },
  })

  const beneficiaryForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
    },
  })
  const arbiterForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
    },
  })
  const managerForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
    },
  })

  const createStandardContractForm = useForm<
    z.infer<typeof CreateStandardContractSchema>
  >({
    resolver: zodResolver(CreateStandardContractSchema),
    defaultValues: {
      arbiterAddress: "",
      beneficiaryAddress: "",
      amount: "",
    },
  })

  return {
    amountForm,
    beneficiaryForm,
    arbiterForm,
    managerForm,
    createStandardContractForm,
  }
}
