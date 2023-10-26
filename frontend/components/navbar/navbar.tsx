import Logo from "@/components/logo"

import NavLinks from "@/components/navbar/nav-links"
import MobileMenu from "@/components/navbar/mobileMenu/mobile-menu"
import { ModeToggle } from "@/components/navbar/mode-toggler"
import CustomConnectButton from "@/components/custom-connect-button"

const Navbar = () => {
  return (
    <nav className="flex items-center py-4 mb-20 md:h-24 dark:bg-secondary bg-secondary">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Logo />
          <NavLinks className="hidden sm:block" />
        </div>
        <div className="items-center hidden gap-2 sm:flex">
          <CustomConnectButton />
          <ModeToggle className="hidden sm:block" />
        </div>
        <MobileMenu className="sm:hidden" />
      </div>
    </nav>
  )
}
export default Navbar
