import CardRow from "@/components/card-row"
import ETHLogo from "@/components/eth-logo"
import { useRequestAmount } from "@/hooks/useRequestAmount"
import { formatEther } from "viem"

const RequestedAmountRow = ({
  contractAddress,
}: {
  contractAddress: string
}) => {
  const { data: requestedAmount } = useRequestAmount(contractAddress)

  return (
    <div className="flex flex-col items-center w-full sm:gap-8 sm:flex-none sm:grid sm:grid-cols-3">
      <p className="text-lg font-semibold ">Requested</p>
      <div className="col-span-2 gap-1 sm:items-center sm:flex">
        <div className="flex items-center justify-center">
          {`${requestedAmount && formatEther(requestedAmount)}`}
          <ETHLogo />
        </div>
        waiting for approval
      </div>
    </div>
  )
}
export default RequestedAmountRow
