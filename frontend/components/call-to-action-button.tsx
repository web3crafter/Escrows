import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CallToActionButtonProps {
  label?: string
  href?: string
  className?: string
}

/**
 * CallToActionButton component displays a button that serves as a call to action.
 * @param {string} label - The label or text displayed on the button (optional, default: "Create Your Escrow Contract").
 * @param {string} href - The URL to which the button should link (optional, default: "/deploy").
 */

export const CallToActionButton = ({
  href = "/deploy",
  label = "Create Your Escrow Contract",
  className,
}: CallToActionButtonProps) => {
  return (
    <Button
      asChild
      size={"lg"}
      className={cn("w-fit place-self-center ", className)}
      variant={"gradient"}
    >
      <Link href={href} className="text-center">
        {label}
      </Link>
    </Button>
  )
}
