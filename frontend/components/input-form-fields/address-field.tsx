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
import { addressSchema } from "@/form-schema/schema"
import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

interface AddressFieldProps {
  label: string
  optionalOrRequiredLabel: string
  disabled?: boolean
  className?: string
  addAction: (value: z.infer<typeof addressSchema>) => void
  addressForm: UseFormReturn<
    {
      address: string
    },
    any,
    undefined
  >
}

const AddressField: React.FC<AddressFieldProps> = ({
  addressForm,
  addAction,
  disabled,
  label,
  className,
  optionalOrRequiredLabel,
}) => {
  return (
    <Form {...addressForm}>
      <form
        onSubmit={addressForm.handleSubmit(addAction)}
        className={className}
      >
        <FormField
          control={addressForm.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <p className="flex flex-col">
                  {label}
                  <span className="text-neutral-500">
                    ({optionalOrRequiredLabel})
                  </span>{" "}
                </p>
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
                    addressForm.reset()
                  }}
                  className="h-6"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  size={"sm"}
                  className="h-6"
                  disabled={disabled}
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
export default AddressField
