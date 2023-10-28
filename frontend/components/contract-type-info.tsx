import { cn } from "@/lib/utils"

import { CallToActionButton } from "@/components/call-to-action-button"

interface ContractTypeInfoProps {
  title: string
  description: React.ReactNode | string
  href: string
  className?: string
  callToActionClassName?: string
  deployPage?: boolean
}
const ContractTypeInfo = ({
  title,
  description,
  href,
  className,
  callToActionClassName,
  deployPage = false,
}: ContractTypeInfoProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between max-w-md gap-8 text-center",
        className
      )}
    >
      {deployPage ? (
        description
      ) : (
        <p className="text-xl sm:text-lg">{description}</p>
      )}
      <CallToActionButton
        href={`/deploy/${href}`}
        label={title}
        className={cn(callToActionClassName)}
      />
    </div>
  )
}
export default ContractTypeInfo
