import CardRow from "@/components/card-row"
import { HoverCopy } from "@/components/hover-copy"
import { formatAddress } from "@/lib/utils"

const ArbiterRow = ({ arbiter }: { arbiter: string }) => {
  return (
    <CardRow
      label="Contract Arbiter"
      description={
        <HoverCopy trigger={formatAddress(arbiter)} content={arbiter} />
      }
    />
  )
}
export default ArbiterRow
