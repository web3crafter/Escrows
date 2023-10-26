"use client"

import { Button } from "@/components/ui/button"
import { formatAddress } from "@/lib/utils"
import { TrashIcon } from "lucide-react"

interface ManagersOverviewSectionProps {
  managers: string[]
  removeFromContract: (key: string, value?: string) => void
}
const ManagersOverviewSection = ({
  managers,
  removeFromContract,
}: ManagersOverviewSectionProps) => {
  return (
    <div>
      <p>Manager{managers && managers.length > 1 && "s"}:</p>
      {managers.map((manager, i) => (
        <div key={i} className="flex items-center justify-between py-1">
          <p className="text-lg">{formatAddress(manager)}</p>
          <Button
            size={"sm"}
            variant={"ghost"}
            className="h-6 text-red-600 hover:bg-red-600"
            onClick={() => removeFromContract("managers", manager)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
export default ManagersOverviewSection
