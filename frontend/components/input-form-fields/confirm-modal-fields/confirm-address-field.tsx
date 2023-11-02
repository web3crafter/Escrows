import { SpinnerButton } from "@/components/spinner-button"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addressSchema } from "@/form-schema/schema"
import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface ConfirmAddressFieldProps {
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
  buttonLabel?: string
  label?: string
  confirmAction: (value: z.infer<typeof addressSchema>) => void
  addressForm: UseFormReturn<
    {
      address: string
    },
    any,
    undefined
  >
}

const ConfirmAddressField: React.FC<ConfirmAddressFieldProps> = ({
  addressForm,
  confirmAction,
  setOpen,
  loading,
  buttonLabel,
  label,
}) => {
  return (
    <Form {...addressForm}>
      <form
        onSubmit={addressForm.handleSubmit(confirmAction)}
        className="w-full"
      >
        <FormField
          control={addressForm.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 w-full items-center">
              <FormControl>
                <Input {...field} className="w-80" />
              </FormControl>
              <div className="flex justify-between items-center w-full px-4">
                <Button
                  variant={"secondary"}
                  type="button"
                  size={"sm"}
                  onClick={() => {
                    setOpen(false)
                    addressForm.reset()
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <SpinnerButton
                  type="submit"
                  size={"sm"}
                  variant={"gradient"}
                  className="text-primary-foreground"
                  loading={loading}
                  disabled={loading}
                >
                  {buttonLabel}
                </SpinnerButton>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
export default ConfirmAddressField
