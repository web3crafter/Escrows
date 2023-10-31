import { cn } from "@/lib/utils"
import Image from "next/image"
import { FaEthereum } from "react-icons/fa"
interface ETHLogoProps {
  className?: string
}
const ETHLogo = ({ className }: ETHLogoProps) => {
  return (
    <div
      className={cn(
        "w-4 h-4 place-self-center flex items-center justify-center ",
        className
      )}
    >
      <FaEthereum className={cn("w-full h-full")} />
      <span className="sr-only">Ethereum Logo</span>
    </div>
  )
}
export default ETHLogo
