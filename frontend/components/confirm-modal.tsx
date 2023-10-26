import { Dispatch, SetStateAction } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

interface AddArbiterModalProps {
  error: boolean
  children: React.ReactNode
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  trigger: React.ReactNode
  heading: string
}
const ConfirmModal: React.FC<AddArbiterModalProps> = ({
  children,
  error,
  open,
  onOpenChange,
  trigger,
  heading,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-12">
        <DialogHeader className="text-2xl font-semibold">
          {heading}
        </DialogHeader>
        {children}

        {error && (
          <p className="text-red-500">Something went wrong, try again</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
export default ConfirmModal
