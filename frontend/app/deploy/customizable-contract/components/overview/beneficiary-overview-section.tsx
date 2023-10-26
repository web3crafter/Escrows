"use client"

import { Button } from "@/components/ui/button"
import { formatAddress } from "@/lib/utils"
import { TrashIcon } from "lucide-react"

interface BeneficiaryOverviewSectionProps {
  beneficiary: string
  removeFromContract: (key: string, value?: string) => void
}
const BeneficiaryOverviewSection = ({
  beneficiary,
  removeFromContract,
}: BeneficiaryOverviewSectionProps) => {
  return (
    <div>
      <p>Beneficiary:</p>
      <div className="flex items-center justify-between">
        <p className="text-lg">
          {beneficiary !== "" && formatAddress(beneficiary)}
        </p>
        {beneficiary && (
          <Button
            size={"sm"}
            variant={"ghost"}
            className="h-6 text-red-600 hover:bg-red-600"
            onClick={() => removeFromContract("beneficiary")}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
export default BeneficiaryOverviewSection
