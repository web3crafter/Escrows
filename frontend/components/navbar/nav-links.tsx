"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const pages = [
  {
    name: "Deploy",
    href: "/deploy",
  },
  {
    name: "Contracts",
    href: "/contracts",
  },
]

interface NavLinksProps {
  className?: string
}

const NavLinks = ({ className }: NavLinksProps) => {
  const pathName = usePathname()

  return (
    <div
      className={cn("sm:flex sm:space-x-5 flex flex-col space-y-2", className)}
    >
      {pages.map((page) => {
        const isActive = pathName === page.href
        return (
          <Link
            key={page.name}
            href={page.href}
            className={cn(
              "underline-offset-4 hover:underline",
              isActive && "text-accent"
            )}
          >
            {page.name}
          </Link>
        )
      })}
    </div>
  )
}
export default NavLinks
