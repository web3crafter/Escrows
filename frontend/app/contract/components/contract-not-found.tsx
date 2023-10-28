import { CopyButton } from "@/components/copy-button"
import { FileX, X } from "lucide-react"
import { CiFileOn } from "react-icons/ci"
import { BsFileEarmarkX } from "react-icons/bs"

const ContractNotFound = ({
  notFoundContractAddress,
}: {
  notFoundContractAddress: string
}) => {
  return (
    <div className="container flex flex-col items-center justify-center gap-5">
      <div className="flex items-center">
        <p className="text-lg font-semibold break-all">
          {notFoundContractAddress}
        </p>
        <CopyButton textToCopy={notFoundContractAddress} />
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-center scroll-m-20">
        Not Found
      </h2>
      <div className="relative w-72 h-72">
        <CiFileOn className="w-full h-full" />
        <div className="absolute w-24 h-24 bottom-1/4 left-1/3">
          <X className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}
export default ContractNotFound
