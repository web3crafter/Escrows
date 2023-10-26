"use client"
import CustomConnectButton from "@/components/custom-connect-button"
import MobileLinks from "@/components/navbar/mobileMenu/mobile-links"
import { ModeToggle } from "@/components/navbar/mode-toggler"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { BiMenu } from "react-icons/bi"
import { useAccount } from "wagmi"

interface MobileMenuProps {
  className?: string
}

const MobileMenu = ({ className }: MobileMenuProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { isConnected } = useAccount()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className={cn(className)}>
        <Button variant={"ghost"}>
          <BiMenu className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <div className="flex flex-col justify-between h-full mt-4">
          <div className="flex flex-col items-center self-center gap-2 w-fit">
            {isConnected ? (
              <p className="text-lg font-semibold">Connected with:</p>
            ) : (
              <p className="text-lg font-semibold">Connect Wallet:</p>
            )}
            <CustomConnectButton handleModalClose={setOpen} />
          </div>
          <MobileLinks className="" />
          <ModeToggle className="self-end" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default MobileMenu
