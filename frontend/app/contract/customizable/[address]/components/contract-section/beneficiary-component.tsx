import CardRow from "@/components/card-row"
import ETHLogo from "@/components/eth-logo"
import { HoverCopy } from "@/components/hover-copy"
import { Card } from "@/components/ui/card"
import { useBeneficiaryBalance } from "@/hooks/useBeneficiaryBalance"
import { useTotalReleasedAmount } from "@/hooks/useTotalReleasedAmount"
import { formatAddress } from "@/lib/utils"
import { formatEther } from "viem"

interface BeneficiaryComponentProps {
  contractAddress: string
  beneficiaryAddress: string
}
const BeneficiaryComponent: React.FC<BeneficiaryComponentProps> = ({
  beneficiaryAddress,
  contractAddress,
}) => {
  const { data: totalReleasedAmount } = useTotalReleasedAmount(contractAddress)
  const { beneficiaryBalance } = useBeneficiaryBalance(beneficiaryAddress)
  return (
    <Card className="flex flex-col items-center gap-6 p-2 sm:p-4 bg-primary/30 sm:gap-0">
      <CardRow
        label="Recipient"
        description={
          <HoverCopy
            trigger={formatAddress(beneficiaryAddress)}
            content={beneficiaryAddress}
          />
        }
      />
      <CardRow
        label="Recipient ballance"
        icon={<ETHLogo />}
        amount={`${beneficiaryBalance}`}
      />

      <CardRow
        label="Total Released"
        icon={<ETHLogo />}
        amount={!totalReleasedAmount ? "0" : formatEther(totalReleasedAmount)}
        description="released from contract to Recipient"
      />
    </Card>
  )
}
export default BeneficiaryComponent
