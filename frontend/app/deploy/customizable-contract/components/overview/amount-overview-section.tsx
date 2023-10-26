"use client"

import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { formatEther } from "viem"

interface AmountOverviewSectionProps {
  amount: string
  removeFromContract: (key: string, value?: string) => void
}
const AmountOverviewSection = ({
  amount,
  removeFromContract,
}: AmountOverviewSectionProps) => {
  return (
    <div>
      <p>Amount:</p>
      <div className="flex items-center justify-between">
        <p className="text-lg">{formatEther(BigInt(amount))} ETH</p>
        {amount && (
          <Button
            size={"sm"}
            variant={"ghost"}
            className="h-6 text-red-600 hover:bg-red-600"
            onClick={() => removeFromContract("amount")}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
export default AmountOverviewSection
