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
import { amountSchema } from "@/form-schema/schema"
import { UseFormReturn } from "react-hook-form"
import { formatEther } from "viem"
import { z } from "zod"

interface ConfirmAmountFieldProps {
  loading: boolean
  buttonLabel?: string
  label?: string
  maxAmountButton?: boolean
  maxAmount?: bigint
  confirmAction: (value: z.infer<typeof amountSchema>) => void
  cancelAction: () => void
  amountForm: UseFormReturn<
    {
      amount: string
    },
    any,
    undefined
  >
}

const ConfirmAmountField: React.FC<ConfirmAmountFieldProps> = ({
  amountForm,
  confirmAction,
  cancelAction,
  loading,
  maxAmount,
  buttonLabel,
  label,
  maxAmountButton = false,
}) => {
  const maxValue = maxAmount ? maxAmount : BigInt(0)
  return (
    <Form {...amountForm}>
      <form
        onSubmit={amountForm.handleSubmit(confirmAction)}
        className="w-full"
      >
        <FormField
          control={amountForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 w-full items-center">
              <div className="flex gap-2">
                <FormControl>
                  <Input {...field} className="md:w-40" />
                </FormControl>
                {maxAmountButton && (
                  <Button
                    type="button"
                    variant={"secondary"}
                    onClick={() => {
                      amountForm.setValue("amount", formatEther(maxValue))
                    }}
                  >
                    Max
                  </Button>
                )}
              </div>
              <div className="flex justify-between items-center w-full px-4">
                <Button
                  variant={"secondary"}
                  type="button"
                  size={"sm"}
                  onClick={cancelAction}
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
                  Confirm
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
export default ConfirmAmountField
