"use client"

import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { toast } from "sonner"

interface CopyButtonProps {
  textToCopy: string
  className?: string
}
export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  className,
}) => {
  const [value, copy] = useCopyToClipboard()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCopy = (textToCopy: string) => {
    try {
      copy(textToCopy)
      toast(`${textToCopy} Copied to Clipboard`)
    } catch (error) {
      toast.error("Failed to copy text")
    }
  }

  if (!isMounted) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn(
              "hover:bg-transparent dark:hover:bg-transparent",
              className
            )}
            onClick={() => handleCopy(textToCopy)}
          >
            <Copy
              size={15}
              className="text-primary-dark-600 hover:text-primary-dark-500 dark:text-primary-dark-500 dark:hover:text-primary-dark-600"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="">
          <p>Copy to Clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
