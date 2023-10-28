import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

interface DeployStandardFormFieldProps {
  createStandardContractForm: UseFormReturn<
    {
      arbiterAddress: string
      beneficiaryAddress: string
      amount: string
    },
    any,
    undefined
  >
  name: "arbiterAddress" | "beneficiaryAddress" | "amount"
  label: string
  description?: string
}

const DeployStandardFormField = ({
  createStandardContractForm,
  name,
  label,
  description,
}: DeployStandardFormFieldProps) => {
  return (
    <FormField
      control={createStandardContractForm.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} className="md:w-80" />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default DeployStandardFormField
