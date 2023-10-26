"use client"
import { CopyButton } from "@/components/copy-button"
import { formatAddress } from "@/lib/utils"

interface PageHeadingProps {
  contractAddress: string
}
const PageHeading = ({ contractAddress }: PageHeadingProps) => {
  return (
    <div className="flex items-center">
      {
        <div className="hidden sm:block">
          <div className="flex items-center ">
            <p className="text-2xl tracking-tight font-semi bold scroll-m-20">
              {contractAddress}
            </p>
            <CopyButton textToCopy={contractAddress} />
          </div>
        </div>
      }
      {
        <div className="sm:hidden">
          <div className="flex items-center ">
            <p className="text-2xl tracking-tight font-semi bold scroll-m-20">
              {formatAddress(contractAddress)}
            </p>
            <CopyButton textToCopy={contractAddress} />
          </div>
        </div>
      }
    </div>
  )
}
export default PageHeading
