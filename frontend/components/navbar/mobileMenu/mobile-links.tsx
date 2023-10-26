import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const PageLinks = [
  {
    name: "Deploy",
    href: "/deploy",
    className: "text-2xl",
  },
  {
    name: "Standard Contract",
    href: "/deploy/standard-contract",
    className: "text-lg pl-4 mt-4 mb-4",
  },
  {
    name: "Customizable Contract",
    href: "/deploy/customizable-contract",
    className: "text-lg pl-4",
  },
  {
    name: "Contracts",
    href: "/contracts",
    className: "mt-8 text-2xl",
  },
]

interface MobileLinksProps {
  className?: string
}

const MobileLinks = ({ className }: MobileLinksProps) => {
  const pathName = usePathname()

  return (
    <div className={cn("flex flex-col", className)}>
      {PageLinks.map((pageLink) => {
        const isActive = pathName === pageLink.href
        return (
          <Link
            key={pageLink.name}
            href={pageLink.href}
            className={cn(
              "underline-offset-4 hover:underline active:scale-95 ",
              isActive && "text-primary font-semibold",
              pageLink.className
            )}
          >
            {pageLink.name}
          </Link>
        )
      })}
    </div>
  )
}
export default MobileLinks
