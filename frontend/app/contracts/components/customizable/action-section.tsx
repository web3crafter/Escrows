import Approve from "@/components/customizable/approve"
import Deposit from "@/components/customizable/deposit"
import RequestETHAmount from "@/components/customizable/request"

interface ActionSectionProps {
  contractAddress: string
  beneficiary: string
}
const ActionSection = ({
  contractAddress,
  beneficiary,
}: ActionSectionProps) => {
  return (
    <div className="flex justify-between">
      <Deposit contractAddress={contractAddress as `0x${string}`} />
      <RequestETHAmount contractAddress={contractAddress as `0x${string}`} />
      <Approve
        contractAddress={contractAddress as `0x${string}`}
        beneficiary={beneficiary as `0x${string}`}
      />
    </div>
  )
}
export default ActionSection
