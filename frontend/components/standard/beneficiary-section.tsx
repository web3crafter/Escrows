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
        <Typography variant={"largeText"} as="div">
          Recipient
        </Typography>
        <HoverCopy trigger={formatAddress(beneficiary)} content={beneficiary} />
      </div>

      {isApproved === true && (
        <div className="flex items-center">
          <ETHLogo />
          <p>Received {isApproved && formatEther(releasedAmount)} ETH</p>
        </div>
      )}
    </div>
  )
}
export default BeneficiarySection
