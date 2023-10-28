import { HoverCopy } from "@/components/hover-copy"
import { formatAddress } from "@/lib/utils"

interface AddressArraySectionProps {
  addressList: string[]
  listType: "arbiters" | "managers"
}
const AddressArraySection = ({
  addressList,
  listType,
}: AddressArraySectionProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold capitalize">{listType}</p>
        <div>
          {addressList.map((arbiter) => {
            return (
              <HoverCopy
                key={arbiter}
                trigger={formatAddress(arbiter)}
                content={arbiter}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
export default AddressArraySection
