"use client"

import { SpinnerButton } from "@/components/spinner-button"
import { Button } from "@/components/ui/button"

interface ConfirmMessageAndButtonsProps {
  address: string
  role: "Manager" | "Arbiter"
  cancelAction: () => void
  confirmAction: () => void
  disabled: boolean
  loading: boolean
}

const ConfirmMessageAndButtons = ({
  address,
  cancelAction,
  confirmAction,
  disabled,
  loading,
  role,
}: ConfirmMessageAndButtonsProps) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center text-lg">
          <span>Are you sure you want to remove</span>
          <span>{address}</span>
          <span> {`as ${role}?`}</span>
        </div>
        <span className="text-base">This action can not be undone!</span>
      </div>
      <div className="flex justify-between items-center w-full px-4">
        <Button
          variant={"secondary"}
          type="button"
          size={"sm"}
          disabled={disabled}
          onClick={cancelAction}
        >
          Cancel
        </Button>
        <SpinnerButton
          size={"sm"}
          variant={"destructive"}
          disabled={disabled}
          loading={loading}
          className="text-primary-foreground"
          onClick={confirmAction}
        >
          Confirm
        </SpinnerButton>
      </div>
    </>
  )
}
export default ConfirmMessageAndButtons
