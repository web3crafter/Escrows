"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { beneficiarySchema } from "@/form-schema/schema"
import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

interface BeneficiaryFieldProps {
  beneficiary: string
  beneficiaryForm: UseFormReturn<
    {
      address: string
    },
    any,
    undefined
  >
  label?: string
  className?: string
  addBeneficiary: (value: z.infer<typeof beneficiarySchema>) => void
}

const BeneficiaryField: React.FC<BeneficiaryFieldProps> = ({
  beneficiaryForm,
  addBeneficiary,
  beneficiary,
  label,
  className,
}) => {
  return (
    <Form {...beneficiaryForm}>
      <form
        onSubmit={beneficiaryForm.handleSubmit(addBeneficiary)}
        className={className}
      >
        <FormField
          control={beneficiaryForm.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                {label ? (
                  label
                ) : (
                  <p className="flex flex-col">
                    Beneficiary of this contract{" "}
                    <span className="text-neutral-500">(required)</span>{" "}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <div className="flex items-center justify-between">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  type="button"
                  onClick={() => {
                    beneficiaryForm.reset()
                  }}
                  className="h-6"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  size={"sm"}
                  className="h-6"
                  disabled={beneficiary !== ""}
                >
                  Add
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
export default BeneficiaryField
