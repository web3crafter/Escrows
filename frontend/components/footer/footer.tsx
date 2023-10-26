import Logo from "@/components/logo"
import { Socials } from "@/components/socials"

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 flex items-center py-4 md:h-20 dark:bg-secondary bg-secondary">
      <div className="container flex items-center justify-between">
        <Logo />
        <Socials />
      </div>
    </footer>
  )
}
export default Footer
