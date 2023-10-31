import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

/**
 * Props for the SpinnerButton component.
 * @param {boolean} loading - Indicates whether the button is in a loading state.
 * @param {React.ReactNode} children - The content to display inside the button.
 * @param {string} className - Additional CSS classes for the button.
 */
interface SpinnerButtonProps extends ButtonProps {
  loading?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * SpinnerButton component displays a button with an optional loading spinner.
 * @param {SpinnerButtonProps} props - The props for the SpinnerButton.
 */
const SpinnerButton: React.FC<SpinnerButtonProps> = ({
  loading,
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn("flex justify-center items-center", className)}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          {children}
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  )
}

export { SpinnerButton }
