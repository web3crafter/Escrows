"use client"

import ETHLogo from "@/components/eth-logo"
import { HoverCopy } from "@/components/hover-copy"
import { Typography } from "@/components/ui/typography"
import { useIsApproved } from "@/hooks/useIsApproved"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { formatAddress } from "@/lib/utils"
import { formatEther } from "viem"

interface BeneficiarySectionProps {
  contractAddress: string
  beneficiary: string
}
const BeneficiarySection = ({
  beneficiary,
  contractAddress,
}: BeneficiarySectionProps) => {
  const { data: isApproved } = useIsApproved(contractAddress)
  const { releasedAmount } = useReleasedAmount(contractAddress)
  return (
    <div className="flex items-center justify-between">
      <div className="sm:flex sm:items-center sm:space-x-2">
        <p className="text-lg font-semibold">Recipient</p>
        <HoverCopy trigger={formatAddress(beneficiary)} content={beneficiary} />
      </div>

      {isApproved === true && (
        <div className="flex items-center">
          <p>Received {isApproved && formatEther(releasedAmount)}</p>
          <ETHLogo />
        </div>
      )}
    </div>
  )
}
export default BeneficiarySection
