import MappingOverviewCard from "@/app/contract/customizable/[address]/components/mappings-overview-card"
import Deposit from "@/components/customizable/deposit"
import { cn } from "@/lib/utils"

interface DepositSectionProps {
  contractAddress: `0x${string}`
  deposits: string[]
  className?: string
}

const DepositSection = ({
  deposits,
  contractAddress,
  className,
}: DepositSectionProps) => {
  return (
    <div className={cn("flex flex-col justify-between w-full p-6", className)}>
      <MappingOverviewCard
        contractAddress={contractAddress as `0x${string}`}
        addressArr={deposits}
        functionName="deposits"
      />
      <Deposit contractAddress={contractAddress as `0x${string}`} />
    </div>
  )
}
export default DepositSection
