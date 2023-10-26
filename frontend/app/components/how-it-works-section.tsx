import { cn } from "@/lib/utils"

// Define an array of steps, each with a label, text, and className.
const steps = [
  {
    label: "Create",
    text: "Choose the type of escrow contract you need and fill in the relevant details. It's as simple as that.",
    className: "text-amber-500 dark:text-amber-600/95",
  },
  {
    label: "Deploy",
    text: "Your escrow contract is deployed on the blockchain, ensuring its security and immutability.",
    className: "text-blue-500 dark:text-blue-700",
  },
  {
    label: "Manage",
    text: "Monitor the status of your escrow contract, make changes as needed, and track the progress of your agreements.",
    className: "text-cyan-400 dark:text-cyan-600",
  },
  {
    label: "Complete",
    text: "When the conditions are met, your funds are released as specified in the contract.",
    className: "text-green-500 dark:text-green-700",
  },
]

/**
 * HowItWorksSection component displays a section explaining the steps or process.
 */
export const HowItWorksSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 text-center sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2",
        className
      )}
    >
      {steps.map((step) => (
        <div key={step.label} className="flex flex-col items-center">
          <h3
            className={cn(
              "scroll-m-20 text-2xl font-semibold tracking-tight",
              "text-amber-500 dark:text-amber-600/95"
            )}
          >
            {step.label}
          </h3>
          <p className="text-xl sm:text-lg">{step.text}</p>
        </div>
      ))}
    </div>
  )
}
