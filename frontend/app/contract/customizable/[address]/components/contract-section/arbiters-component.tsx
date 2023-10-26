"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { decodeEventLog } from "viem"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi"

import { revalidatePagePath } from "@/action/revalidate-path"
import { updateArbiters } from "@/action/db/customizable/arbiters"
import { formatAddress, handleModalState } from "@/lib/utils"
import { addressSchema } from "@/form-schema/schema"
import { customizableContractAbi } from "@/constants/abi/abis"

import { useCustomizableAccountRoles } from "@/hooks/useCustomizableAccountRoles"

import { HoverCopy } from "@/components/hover-copy"
import ConfirmModal from "@/components/confirm-modal"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import ConfirmMessageAndButtons from "@/app/contract/customizable/[address]/components/contract-section/confirm-message-and-buttons"
import ConfirmAddressField from "@/components/input-form-fields/confirm-modal-fields/confirm-address-field"
import { toast } from "sonner"

interface ArbitersComponentProps {
  contractAddress: `0x${string}`
  arbiters: string[]
}
const ArbitersComponent: React.FC<ArbitersComponentProps> = ({
  arbiters,
  contractAddress,
}) => {
  const arbiterForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
    },
  })

  const [open, setOpen] = useState(false)
  const [openRemoveArbiter, setOpenRemoveArbiter] = useState(false)
  const { address: accountAddress, isConnected } = useAccount()

  const { isDeployer, isManager } = useCustomizableAccountRoles(contractAddress)

  const { data: addArbiterResult, write: WriteAddArbiter } = useContractWrite({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "addArbiter",
  })
  const { data: addArbiterReceipt, status: addedArbiterStatus } =
    useWaitForTransaction({
      hash: addArbiterResult?.hash,
      confirmations: 1,
      onSuccess(txReceipt) {
        const addArbiterEvent = decodeEventLog({
          abi: customizableContractAbi,
          eventName: "AddedArbiter",
          topics: txReceipt.logs[0].topics,
        })
        const arbiterToAdd = addArbiterEvent.args.arbiterAdded
        if (txReceipt.status === "success") {
          if (!arbiters.includes(arbiterToAdd)) {
            updateArbiters(contractAddress, arbiterToAdd, "add")
            handleModalState(arbiterForm, open, setOpen)
            revalidatePagePath(`/contract/customizable/${contractAddress}`)
            toast.success("Added Arbiter Success")
          } else {
            toast("Arbiter already in db")
          }
        } else {
          toast.error("Transaction reverted")
        }
      },
    })

  const { data: removeArbiterResult, write: WriteRemoveArbiter } =
    useContractWrite({
      address: contractAddress,
      abi: customizableContractAbi,
      functionName: "removeArbiter",
    })
  const { data: removedArbiterReceipt, status: removedArbiterStatus } =
    useWaitForTransaction({
      hash: removeArbiterResult?.hash,
      confirmations: 1,
      onSuccess(txReceipt) {
        const removedArbiterEvent = decodeEventLog({
          abi: customizableContractAbi,
          eventName: "RemovedArbiter",
          topics: txReceipt.logs[0].topics,
        })
        const arbiterToRemove = removedArbiterEvent.args.arbiterRemoved
        if (txReceipt.status === "success") {
          if (arbiters.includes(arbiterToRemove)) {
            updateArbiters(contractAddress, arbiterToRemove, "remove")
            setOpenRemoveArbiter(false)
            revalidatePagePath(`/contract/customizable/${contractAddress}`)
            toast.success("Removed Arbiter Success")
          } else {
            toast.error("Added Arbiter Failed")
          }
        }
      },
    })

  const addArbiter = async (value: z.infer<typeof addressSchema>) => {
    if (!isDeployer && !isManager) {
      toast.error("Only the deployer or manager can add arbiters")
    }
    WriteAddArbiter({
      args: [value.address as `0x${string}`],
    })
  }

  const removeArbiter = async (arbiter: string) => {
    if (!isDeployer && !isManager) {
      toast("Only the deployer or manager can remove arbiters")
    }
    WriteRemoveArbiter({
      args: [arbiter as `0x${string}`],
    })
  }

  const addArbDB = () => {
    updateArbiters(
      contractAddress,
      "0xC2F4f85812251A7A1b16d2CBAB371a7A9520c33D",
      "add"
    )
  }
  const removeArbDB = () => {
    updateArbiters(contractAddress, "", "remove")
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-lg font-semibold">
          Arbiter{arbiters.length > 1 && "s"}{" "}
        </p>
        {/* <Button onClick={addArbDB}>Add DB</Button>
        <Button onClick={removeArbDB}>Remove DB</Button> */}

        {(isDeployer || isManager) && (
          <ConfirmModal
            error={addedArbiterStatus === "error"}
            open={open}
            onOpenChange={() => handleModalState(arbiterForm, open, setOpen)}
            heading="Add Arbiter"
            trigger={
              <Button
                size={"sm"}
                className={"h-7"}
                disabled={!isDeployer && !isManager}
                variant={"gradient"}
              >
                Add
              </Button>
            }
          >
            <ConfirmAddressField
              addressForm={arbiterForm}
              confirmAction={addArbiter}
              loading={addedArbiterStatus === "loading"}
              setOpen={setOpen}
            />
          </ConfirmModal>
        )}
      </div>
      {arbiters.map((arbiter) => (
        <div
          key={arbiter}
          className="flex items-center gap-2 mt-2 border-b border-border/30"
        >
          <HoverCopy trigger={formatAddress(arbiter)} content={arbiter} />
          {(isDeployer || isManager) && (
            <ConfirmModal
              error={removedArbiterStatus === "error"}
              heading="Remove Arbiter"
              open={openRemoveArbiter}
              onOpenChange={setOpenRemoveArbiter}
              trigger={
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="h-6 text-red-600 hover:bg-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              }
            >
              <ConfirmMessageAndButtons
                address={arbiter}
                role="Arbiter"
                cancelAction={() => setOpenRemoveArbiter(false)}
                confirmAction={() => removeArbiter(arbiter)}
                disabled={removedArbiterStatus === "loading"}
                loading={removedArbiterStatus === "loading"}
              />
            </ConfirmModal>
          )}
        </div>
      ))}
    </div>
  )
}
export default ArbitersComponent
