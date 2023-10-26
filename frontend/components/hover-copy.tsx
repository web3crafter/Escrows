"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useIsMounted } from "@/hooks/useIsMounted"
import { Copy } from "lucide-react"
import { toast } from "sonner"

interface HoverCopyProps {
  trigger: string
  content: string
}
export const HoverCopy: React.FC<HoverCopyProps> = ({ trigger, content }) => {
  const [value, copy] = useCopyToClipboard()
  const isMounted = useIsMounted()

  const handleCopy = (textToCopy: string) => {
    try {
      copy(textToCopy)
      toast(`${textToCopy} Copied to Clipboard`)
    } catch (error) {
      toast.error("Failed to copy text")
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => handleCopy(content)}
          className="flex items-center space-x-2"
        >
          <p className="hover:cursor-pointer">{trigger}</p>
          <Copy
            size={15}
            className="text-primary-dark-600 hover:text-primary-dark-500 dark:text-primary-dark-500 dark:hover:text-primary-dark-600"
          />
        </TooltipTrigger>
        <TooltipContent className="bg-primary w-fit">
          <p className="text-base">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
