import { Button } from "@/components/ui/button"

interface CardRowProps {
  label: string
  amount?: string
  onClick?: () => void
  buttonLabel?: string | React.ReactNode
  icon?: React.ReactNode
  description?: string | React.ReactNode
}
const CardRow: React.FC<CardRowProps> = ({
  label,
  amount,
  description,
  icon,
  onClick,
  buttonLabel,
}) => {
  return (
    <div className="flex flex-col items-center w-full sm:gap-8 sm:flex-none sm:grid sm:grid-cols-3">
      <p className="text-lg font-semibold ">{label}</p>
      <div className="flex items-center col-span-2 gap-1 ">
        {amount && <p>{amount?.toString()}</p>}
        {icon && <div>{icon}</div>}
        {description && <div>{description}</div>}
      </div>
      {onClick && (
        <Button size={"sm"} className="h-7">
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}
export default CardRow
