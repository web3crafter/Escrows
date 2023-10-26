import { cn } from "@/lib/utils"
import { CheckCircle, Fingerprint, Globe, Lightbulb } from "lucide-react"

// Define an array of pointers, each containing label, text, and an icon.

const iconSize = "w-14 h-14 sm:w-12 sm:h-12 lg:h-14 lg:w-14"
export const pointers = [
  {
    Label: "Security",
    text: "Your funds and agreements are secured by the power of blockchain technology, ensuring transparency and trust.",
    icon: (
      <Fingerprint
        className={cn(`text-blue-500 dark:text-blue-700`, iconSize)}
      />
    ),
  },
  {
    Label: "User Friendly",
    text: "Our intuitive interface makes it easy for users of all levels to create, manage, and track their escrow contracts.",
    icon: (
      <CheckCircle
        className={cn(`text-amber-500 dark:text-amber-600/95`, iconSize)}
      />
    ),
  },
  {
    Label: "Decentralized",
    text: "We believe in the principles of decentralization, giving you full ownership and control over your escrow agreements.",
    icon: (
      <Globe className={cn(`text-green-500 dark:text-green-700`, iconSize)} />
    ),
  },
  {
    Label: "Innovation",
    text: "Be a part of pioneering the future of how financial agreements are made and secured.",
    icon: (
      <Lightbulb className={cn(`text-cyan-400 dark:text-cyan-600`, iconSize)} />
    ),
  },
]

/**
 * PointersSection component displays a section with key points or features.
 */
export const PointersSection = () => {
  return (
    // <div className="container space-y-8 md:flex md:gap-20 md:py-16">
    <div className="container sm:grid sm:grid-cols-2 sm:grid-rows-2 lg:flex lg:gap-20 lg:py-16">
      {pointers.map((pointer) => (
        <div
          key={pointer.Label}
          className="flex flex-col items-center gap-2 sm:gap-4 hover:scale-105"
        >
          <div className="p-4 rounded-full ">{pointer.icon}</div>
          <h2 className="text-2xl font-semibold tracking-tight text-center scroll-m-20">
            {pointer.Label}
          </h2>
          <p className="max-w-xs mt-2 leading-7 text-center sm:text-base">
            {pointer.text}
          </p>
        </div>
      ))}
    </div>
  )
}
