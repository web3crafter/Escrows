import ArbiterRow from "@/components/card-rows/arbiter-row"
import OwnerRow from "@/components/card-rows/owner-row"
import RecipientRow from "@/components/card-rows/recipient-row"

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
      <OwnerRow owner={deployer} />
      <ArbiterRow arbiter={arbiter} />
      <RecipientRow beneficiary={beneficiary} />
    </div>
  )
}
export default AddressInfoSection
