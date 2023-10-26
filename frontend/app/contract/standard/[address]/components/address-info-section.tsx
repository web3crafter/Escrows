import CardRow from "@/components/card-row"
import ContractArbiter from "@/components/card-rows/contract-arbiter"
import ContractOwner from "@/components/card-rows/contract-owner"
import ContractRecipient from "@/components/card-rows/contract-recipient"
import { HoverCopy } from "@/components/hover-copy"
import { formatAddress } from "@/lib/utils"

interface AddressInfoSectionProps {
  deployer: string
  arbiter: string
  beneficiary: string
}
const AddressInfoSection = ({
  deployer,
  arbiter,
  beneficiary,
}: AddressInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <ContractOwner owner={deployer} />
      <ContractArbiter arbiter={arbiter} />
      <ContractRecipient beneficiary={beneficiary} />
    </div>
  )
}
export default AddressInfoSection
