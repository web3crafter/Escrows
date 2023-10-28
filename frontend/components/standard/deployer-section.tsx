"use client"

import ETHLogo from "@/components/eth-logo"
import { HoverCopy } from "@/components/hover-copy"
import { SpinnerButton } from "@/components/spinner-button"
import { standardContractAbi } from "@/constants/abi/abis"
import { useIsApproved } from "@/hooks/useIsApproved"
import { useReleasedAmount } from "@/hooks/useReleasedAmount"
import { useStandardAccountRoles } from "@/hooks/useStandardAccountRoles"
import { formatAddress } from "@/lib/utils"
import { toast } from "sonner"
import { formatEther } from "viem"
import { useContractWrite, useWaitForTransaction } from "wagmi"

interface DeployerSectionProps {
  deployer: string
  contractAddress: string
}
const DeployerSection = ({
  deployer,
  contractAddress,
}: DeployerSectionProps) => {
  const { isDeployer } = useStandardAccountRoles(contractAddress)
  const { data: isApproved, refetch: refetchIsApproved } =
    useIsApproved(contractAddress)
  const { releasedAmount, refetch: refetchReleasedAmount } =
    useReleasedAmount(contractAddress)

  const { data: depositResult, write: writeDeposit } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: standardContractAbi,
    functionName: "deposit",
  })
  const { data: depositReceipt, status: depositedStatus } =
    useWaitForTransaction({
      hash: depositResult?.hash,
      confirmations: 1,
      onSuccess(data) {
        refetchIsApproved()
        refetchReleasedAmount()
      },
    })

  const deposit = () => {
    if (!isDeployer) {
      toast("Only the deployer of the contract can deposit funds")
    }
    writeDeposit?.({
      value: releasedAmount,
    })
  }
  return (
    <div className="flex items-center justify-between">
      <div className="sm:flex sm:items-center sm:space-x-2">
        <p className="text-lg font-semibold">Owner</p>
        <HoverCopy trigger={formatAddress(deployer)} content={deployer} />
      </div>

      {!isApproved && (
        <div className="flex items-center ">
          <ETHLogo className="" />
          <p>Sent {formatEther(releasedAmount)} ETH</p>
        </div>
      )}

      {isDeployer && isApproved && (
        <SpinnerButton
          variant={"gradient"}
          size={"sm"}
          disabled={depositedStatus === "loading" || !isApproved}
          onClick={deposit}
          loading={depositedStatus === "loading"}
          className="sm:h-7"
        >
          <div className="flex">
            {`Deposit ${formatEther(releasedAmount)}`} <ETHLogo />
          </div>
        </SpinnerButton>
      )}
    </div>
  )
}
export default DeployerSection
