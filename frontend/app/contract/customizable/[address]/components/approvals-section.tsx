import MappingOverviewCard from "@/app/contract/customizable/[address]/components/mappings-overview-card"
import Approve from "@/components/customizable/approve"
import { cn } from "@/lib/utils"

interface ApprovalsSectionProps {
  contractAddress: `0x${string}`
  approvals: string[]
  beneficiary: string
  className?: string
}
const ApprovalsSection = ({
  contractAddress,
  approvals,
  beneficiary,
  className,
}: ApprovalsSectionProps) => {
  return (
    <div className={cn("flex flex-col justify-between w-full p-6", className)}>
      <MappingOverviewCard
        contractAddress={contractAddress as `0x${string}`}
        addressArr={approvals}
        functionName="approvals"
      />
      <Approve
        contractAddress={contractAddress as `0x${string}`}
        beneficiary={beneficiary}
      />
    </div>
  )
}
export default ApprovalsSection
