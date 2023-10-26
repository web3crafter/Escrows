import { cn } from "@/lib/utils"
import Image from "next/image"
import { FaEthereum } from "react-icons/fa"
interface ETHLogoProps {
  className?: string
}
const ETHLogo = ({ className }: ETHLogoProps) => {
  return (
    <div className={cn("w-4 h-4 flex items-center ", className)}>
      <FaEthereum className={cn("w-full h-full")} />
    </div>
  )
}
export default ETHLogo
