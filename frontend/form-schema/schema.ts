import { isAddress } from "viem"
import { z } from "zod"

export const validAddressSchema = z
  .string()
  .refine((value) => isAddress(value), "Invalid Ethereum Address")

export const CreateStandardContractSchema = z.object({
  arbiterAddress: validAddressSchema,
  beneficiaryAddress: validAddressSchema,
  amount: z.string().min(1, {
    message: "amount needs to be greater than zero",
  }),
})

export const addressSchema = z.object({
  address: validAddressSchema,
})

export const amountSchema = CreateStandardContractSchema.pick({ amount: true })
