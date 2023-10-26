import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center space-x-2">
      <div className="relative w-12 h-12 ">
        <Image src={"/web3crafter.ico"} alt="logo" fill />
      </div>
      <div className="flex flex-col items-center text-lg font-bold text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
        <p className="">Web3Crafter</p>
        <p className="">Escrow</p>
      </div>
    </Link>
  )
}
export default Logo
