"use client"

import { HoverCopy } from "@/components/hover-copy"
import { Typography } from "@/components/ui/typography"
import { useIsApproved } from "@/hooks/useIsApproved"
import { cn, formatAddress } from "@/lib/utils"

interface ArbiterSectionProps {
  contractAddress: string
  arbiter: string
}

const ArbiterSection = ({ arbiter, contractAddress }: ArbiterSectionProps) => {
  const { data: isApproved } = useIsApproved(contractAddress)
  return (
    <div className="flex items-center justify-between">
      <div className="sm:flex sm:items-center sm:space-x-2">
        <Typography variant={"largeText"} as="div">
          Arbiter
        </Typography>
        <HoverCopy trigger={formatAddress(arbiter)} content={arbiter} />
      </div>
      <p className={cn(isApproved ? "text-green-500" : "text-orange-500")}>
        {isApproved ? "Completed" : "In progress"}
      </p>
    </div>
  )
}
export default ArbiterSection
