"use client"

import { updateManagers } from "@/action/db/customizable/managers"
import { revalidatePagePath } from "@/action/revalidate-path"
import ConfirmMessageAndButtons from "@/app/contract/customizable/[address]/components/contract-section/confirm-message-and-buttons"
import ConfirmModal from "@/components/confirm-modal"
import { HoverCopy } from "@/components/hover-copy"
import ConfirmAddressField from "@/components/input-form-fields/confirm-modal-fields/confirm-address-field"
import { Button } from "@/components/ui/button"
import { customizableContractAbi } from "@/constants/abi/abis"
import { addressSchema } from "@/form-schema/schema"
import { useCustomizableAccountRoles } from "@/hooks/useCustomizableAccountRoles"
import { useValidatedForms } from "@/hooks/useValidatedForms"
import { formatAddress, handleModalState } from "@/lib/utils"
import { ConfirmationButtonText } from "@/types/types"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { UserRejectedRequestError, decodeEventLog } from "viem"
import { useContractWrite, useWaitForTransaction } from "wagmi"
import { z } from "zod"

interface ManagersComponentProps {
  contractAddress: `0x${string}`
  managers: string[]
}
const ManagersComponent: React.FC<ManagersComponentProps> = ({
  managers,
  contractAddress,
}) => {
  const { managerForm } = useValidatedForms()
  const [open, setOpen] = useState(false)
  const [openRemoveManager, setOpenRemoveManager] = useState(false)
  const [confirmationButtonText, setConfirmationButtonText] =
    useState<ConfirmationButtonText>("confirm")
  const { isDeployer } = useCustomizableAccountRoles(contractAddress)

  const { data: addManagerResult, write: WriteAddManager } = useContractWrite({
    address: contractAddress,
    abi: customizableContractAbi,
    functionName: "addManager",
    onSuccess: () => setConfirmationButtonText("Transaction pending"),
    onError: (e) => {
      const error = e as UserRejectedRequestError
      if (error.shortMessage === "User rejected the request.") {
        setConfirmationButtonText("confirm")
        toast.error("Transaction canceled")
      }
    },
  })

  const { data: addedManagerReceipt, status: addedManagerStatus } =
    useWaitForTransaction({
      hash: addManagerResult?.hash,
      confirmations: 1,
      onSuccess(txReceipt) {
        const addedManagerEvent = decodeEventLog({
          abi: customizableContractAbi,
          eventName: "AddedManager",
          topics: txReceipt.logs[0].topics,
        })
        const managerToAdd = addedManagerEvent.args.managerAdded
        if (txReceipt.status === "success") {
          if (!managers.includes(managerToAdd)) {
            updateManagers(contractAddress, managerToAdd, "add")
            setConfirmationButtonText("confirm")
            if (open) {
              handleModalState(managerForm, open, setOpen)
            }
            revalidatePagePath(`/contract/customizable/${contractAddress}`)
            toast.success("Added Manager Success")
          } else {
            toast.error("Added Manager Failed")
          }
        }
      },
    })

  const { data: removeManagerResult, write: WriteRemoveManager } =
    useContractWrite({
      address: contractAddress,
      abi: customizableContractAbi,
      functionName: "removeManager",
      onSuccess: () => setConfirmationButtonText("Transaction pending"),
      onError: (e) => {
        const error = e as UserRejectedRequestError
        if (error.shortMessage === "User rejected the request.") {
          setConfirmationButtonText("confirm")
          toast.error("Transaction canceled")
        }
      },
    })
  const { status: removedManagerStatus } = useWaitForTransaction({
    hash: removeManagerResult?.hash,
    confirmations: 1,
    onSuccess(txReceipt) {
      const removedManagerEvent = decodeEventLog({
        abi: customizableContractAbi,
        eventName: "RemovedManager",
        topics: txReceipt.logs[0].topics,
      })
      const managerToRemove = removedManagerEvent.args.managerRemoved
      if (txReceipt.status === "success") {
        if (managers.includes(managerToRemove)) {
          updateManagers(contractAddress, managerToRemove, "remove")
          setConfirmationButtonText("confirm")
          setOpenRemoveManager(false)
          revalidatePagePath(`/contract/customizable/${contractAddress}`)
          managerForm.reset()
          toast.success("Removed Manager Success")
        } else {
          toast.error("Removed Manager Failed")
        }
      }
    },
  })

  const addManager = (value: z.infer<typeof addressSchema>) => {
    if (!isDeployer) {
      toast.error("Only the deployer can add managers")
    }
    setConfirmationButtonText("Waiting for confirmation")
    WriteAddManager({
      args: [value.address as `0x${string}`],
    })
  }

  const removeManager = (manager: string) => {
    if (!isDeployer) {
      toast.error("Only the deployer can remove managers")
    }
    setConfirmationButtonText("Waiting for confirmation")
    WriteRemoveManager({
      args: [manager as `0x${string}`],
    })
  }

  const addManagerDB = () => {
    updateManagers(
      contractAddress,
      "0xC2F4f85812251A7A1b16d2CBAB371a7A9520c33D",
      "add"
    )
  }
  const removeManagerDB = () => {
    updateManagers(
      contractAddress,
      "0xC2F4f85812251A7A1b16d2CBAB371a7A9520c33D",
      "remove"
    )
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-lg font-semibold">
          Manager{managers.length > 1 && "s"}{" "}
        </p>

        {/* <Button onClick={addManagerDB}>Add DB</Button>
        <Button onClick={removeManagerDB}>Remove DB</Button> */}
        {isDeployer && (
          <ConfirmModal
            error={addedManagerStatus === "error"}
            open={open}
            onOpenChange={() => handleModalState(managerForm, open, setOpen)}
            heading="Add Manager"
            trigger={
              <Button
                size={"sm"}
                className={"h-7"}
                disabled={!isDeployer}
                variant={"gradient"}
              >
                Add
              </Button>
            }
          >
            <ConfirmAddressField
              addressForm={managerForm}
              confirmAction={addManager}
              loading={addedManagerStatus === "loading"}
              setOpen={setOpen}
              buttonLabel={confirmationButtonText}
            />
          </ConfirmModal>
        )}
      </div>
      {managers &&
        managers.length > 0 &&
        managers.map((manager) => (
          <div
            key={manager}
            className="flex items-center gap-2 mt-2 border-b border-border/30"
          >
            <HoverCopy trigger={formatAddress(manager)} content={manager} />
            {isDeployer && (
              <ConfirmModal
                heading="Remove Manager"
                error={removedManagerStatus === "error"}
                open={openRemoveManager}
                onOpenChange={setOpenRemoveManager}
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
                  address={manager}
                  role="Manager"
                  cancelAction={() => setOpenRemoveManager(false)}
                  confirmAction={() => removeManager(manager)}
                  disabled={removedManagerStatus === "loading"}
                  loading={removedManagerStatus === "loading"}
                  confirmButtonLabel={confirmationButtonText}
                />
              </ConfirmModal>
            )}
          </div>
        ))}
    </div>
  )
}
export default ManagersComponent
