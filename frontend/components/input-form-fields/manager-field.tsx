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
import { managerSchema } from "@/form-schema/schema"
import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

interface ManagerFieldProps {
  managerForm: UseFormReturn<
    {
      address: string
    },
    any,
    undefined
  >
  label?: string
  className?: string
  addManager: (value: z.infer<typeof managerSchema>) => void
}
const ManagerField: React.FC<ManagerFieldProps> = ({
  managerForm,
  addManager,
  label,
  className,
}) => {
  return (
    <Form {...managerForm}>
      <form
        onSubmit={managerForm.handleSubmit(addManager)}
        className={className}
      >
        <FormField
          control={managerForm.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                {label ? (
                  label
                ) : (
                  <p className="flex flex-col">
                    Managers of this contract{" "}
                    <span className="text-neutral-500">
                      (one or more optional)
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
                    managerForm.reset()
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
export default ManagerField
