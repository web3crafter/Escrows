import CardRow from "@/components/card-row"
import { HoverCopy } from "@/components/hover-copy"
import { formatAddress } from "@/lib/utils"

const ContractOwner = ({ owner }: { owner: string }) => {
  return (
    <CardRow
      label="Contract Owner"
      description={<HoverCopy trigger={formatAddress(owner)} content={owner} />}
    />
  )
}
export default ContractOwner
