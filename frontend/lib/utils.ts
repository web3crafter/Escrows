import { addressSchema } from "@/form-schema/schema"
import { PromiseResult } from "@/types/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAddress = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`
}

export const validateAddressWithZod = (address: string) => {
  return addressSchema.safeParse(address)
}

export const findPathName = (pathName: string) => {
  const splitPathName = pathName.split("/")
  return splitPathName[splitPathName.length - 1]
}

export function isFulfilled<T>(
  result: PromiseResult<T>
): result is { status: "fulfilled"; value: T } {
  return result.status === "fulfilled"
}

export const handleModalState = <T extends Record<string, any>>(
  form: T,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!open) {
    setOpen(true)
  } else {
    form.reset()
    setOpen(false)
  }
}
