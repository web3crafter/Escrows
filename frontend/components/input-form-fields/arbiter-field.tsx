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
import { arbiterSchema } from "@/form-schema/schema"
import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

interface ArbiterFieldProps {
  arbiterForm: UseFormReturn<
    {
      address: string
    },
    any,
    undefined
  >
  label?: string
  className?: string
  addArbiter: (value: z.infer<typeof arbiterSchema>) => void
}

const ArbiterField: React.FC<ArbiterFieldProps> = ({
  arbiterForm,
  addArbiter,
  label,
  className,
}) => {
  return (
    <Form {...arbiterForm}>
      <form
        onSubmit={arbiterForm.handleSubmit(addArbiter)}
        className={className}
      >
        <FormField
          control={arbiterForm.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                {label ? (
                  label
                ) : (
                  <p className="flex flex-col">
                    Arbiters of this contract{" "}
                    <span className="text-neutral-500">
                      (one or more required)
                    </span>{" "}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <div className="flex items-center justify-between">
                <Button
                  variant={"ghost"}
                  type="button"
                  size={"sm"}
                  onClick={() => {
                    arbiterForm.reset()
                  }}
                  className="h-6"
                >
                  Reset
                </Button>
                <Button type="submit" size={"sm"} className="h-6">
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
export default ArbiterField
