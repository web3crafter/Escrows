"use client"

import { Button } from "@/components/ui/button"
import { formatAddress } from "@/lib/utils"
import { TrashIcon } from "lucide-react"

interface ArbitersOverviewSectionProps {
  arbiters: string[]
  removeFromContract: (key: string, value?: string) => void
}
const ArbitersOverviewSection = ({
  arbiters,
  removeFromContract,
}: ArbitersOverviewSectionProps) => {
  return (
    <div>
      <p>Arbiter{arbiters && arbiters.length > 1 && "s"}:</p>

      {arbiters.map((arbiter, i) => (
        <div key={i} className="flex items-center justify-between py-1">
          <p className="text-lg">{formatAddress(arbiter)}</p>
          <Button
            size={"sm"}
            variant={"ghost"}
            className="h-6 text-red-600 hover:bg-red-600"
            onClick={() => removeFromContract("arbiters", arbiter)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
export default ArbitersOverviewSection
