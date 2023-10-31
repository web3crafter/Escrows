import Link from "next/link"
import { SiGithub, SiTwitter } from "react-icons/si"

export const Socials = () => {
  return (
    <div className="flex py-2 space-x-4 sm:space-x-2">
      <Link
        href={"https://github.com/web3crafter"}
        target="_blank"
        className=""
      >
        <SiGithub className="w-6 h-6" />
      </Link>
      <Link
        href={"https://twitter.com/web3crafter"}
        target="_blank"
        className="text-twitter"
      >
        <SiTwitter className="w-6 h-6" />
      </Link>
    </div>
  )
}
