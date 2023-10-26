"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { EscrowType, FilterKey } from "@/types/types"

const buttons = [
  {
    displayName: "All Contracts",
    type: "all_contracts",
  },
  {
    displayName: "Owner",
    type: "deployer",
  },
  {
    displayName: "Recipient",
    type: "beneficiary",
  },
  {
    displayName: "Arbiter",
    type: "arbiter",
  },
  {
    displayName: "Arbiter",
    type: "arbiters",
  },
  {
    displayName: "Manager",
    type: "managers",
  },
]

interface RoleSelectProps {
  className?: string
  activeTab: EscrowType
  setKeyToFilterOn: React.Dispatch<React.SetStateAction<FilterKey>>
  displayValue: string
}

const RoleSelect = ({
  className,
  activeTab,
  setKeyToFilterOn,
  displayValue,
}: RoleSelectProps) => {
  const handleSelect = (value: string) => {
    if (activeTab === "standard") {
      setKeyToFilterOn(value as FilterKey)
    } else {
      setKeyToFilterOn(value as FilterKey)
    }
  }

  return (
    <div className={cn(className)}>
      <Label htmlFor="filter" className="text-center">
        User Role
      </Label>
      <Select
        onValueChange={handleSelect}
        defaultValue={displayValue}
        value={displayValue}
      >
        <SelectTrigger className={cn("w-32 capitalize")} id="filter">
          <SelectValue placeholder={displayValue} />
        </SelectTrigger>
        <SelectContent>
          {activeTab === "standard"
            ? buttons.map((button, i) => {
                if (button.type === "managers" || button.type === "arbiters")
                  return null
                return (
                  <SelectItem key={button.displayName} value={button.type}>
                    {button.displayName}
                  </SelectItem>
                )
              })
            : buttons.map((button, i) => {
                if (button.type === "arbiter") return null
                return (
                  <SelectItem key={button.displayName} value={button.type}>
                    {button.displayName}
                  </SelectItem>
                )
              })}
        </SelectContent>
      </Select>
    </div>
  )
}
export default RoleSelect
