import { CopyButton } from "@/components/copy-button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ContractAddressSectionProps {
  contractAddress: string
  contractType: "standard" | "customizable"
}
const ContractAddressSection: React.FC<ContractAddressSectionProps> = ({
  contractAddress,
  contractType,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Link
        href={`/contract/${contractType}/${contractAddress}`}
        className="flex items-center space-x-2 hover:underline hover:underline-offset-1"
      >
        <h4 className="text-xl font-semibold tracking-tight break-all scroll-m-20">
          {contractAddress}
        </h4>

        <div className="flex items-center justify-center w-4 h-4">
          <ExternalLink className="text-primary-dark-600 dark:text-primary-dark-500" />
        </div>
      </Link>
      <CopyButton textToCopy={contractAddress} />
    </div>
  )
}

export default ContractAddressSection
