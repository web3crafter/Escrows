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
import { amountSchema } from "@/form-schema/schema"
import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

interface AmountFieldProps {
  amount?: string
  label?: string
  confirmAction: (value: z.infer<typeof amountSchema>) => void
  buttonLabel?: string
  className?: string
  amountForm: UseFormReturn<
    {
      amount: string
    },
    any,
    undefined
  >
}

const AmountField: React.FC<AmountFieldProps> = ({
  amountForm,
  confirmAction,
  label,
  buttonLabel = "Add",
  className,
  amount,
}) => {
  return (
    <Form {...amountForm}>
      <form
        onSubmit={amountForm.handleSubmit(confirmAction)}
        className={className}
      >
        <FormField
          control={amountForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                {label ? (
                  label
                ) : (
                  <p className="flex flex-col">
                    Amount of ETH to deposit{" "}
                    <span className="text-neutral-500">(optional)</span>{" "}
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
                    amountForm.reset()
                  }}
                  className="h-6"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  size={"sm"}
                  className="h-6"
                  disabled={amount !== ""}
                >
                  {buttonLabel}
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
export default AmountField
