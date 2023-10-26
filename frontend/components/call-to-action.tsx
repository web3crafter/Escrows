import { CallToActionButton } from "@/components/call-to-action-button"
import { cn } from "@/lib/utils"

/**
 * CallToAction component displays a call-to-action section.
 */
export const CallToAction = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center justify-center gap-8 ",
        className
      )}
    >
      <h3 className="text-2xl font-semibold tracking-tight">
        Create your contract
      </h3>
      <p className="text-xl sm:text-lg">
        Empower yourself with the ability to create escrow contracts that match
        your unique requirements. Join Web3Crafter Escrow now and experience the
        future of secure and customizable financial agreements.
      </p>
      <CallToActionButton className="bg-gradient-to-r from-violet-950 to-accent dark:from-violet-900 dark:to-accent" />
    </div>
  )
}
