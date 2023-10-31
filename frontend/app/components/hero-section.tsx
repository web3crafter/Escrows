import { CallToActionButton } from "@/components/call-to-action-button"
import Image from "next/image"

/**
 * HeroSection component displays a hero section with a welcome message, a description,
 * and a call to action button.
 */

export const HeroSection = () => {
  return (
    <div className="container flex items-center gap-4">
      <div className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold tracking-tight text-center sm:text-3xl scroll-m-20 md:text-left">
            Welcome to{" "}
            <span className="text-transparent bg-gradient-to-tr from-primary via-accent to-primary bg-clip-text">
              Web3Crafter
            </span>{" "}
            Escrows
          </h2>
          <h1 className="text-3xl font-extrabold tracking-tight text-center md:text-left sm:text-4xl scroll-m-20 lg:text-5xl">
            Your Escrow Contract Creator
          </h1>
        </div>

        <p className="mt-2 text-center leading-7 text-xl sm:text-2xl md:text-xl lg:text-2xl md:text-left">
          Are you in need of a secure and customizable way to handle financial
          transactions, agreements, or deals? Look no further! With Web3Crafter
          Escrows, you have the power to create, and manage your very own escrow
          contracts. Deployed on the Sepolia test network, tailored to your
          unique needs.
        </p>
        <CallToActionButton className="text-base bg-gradient-to-r from-violet-950 to-accent dark:from-violet-950 dark:to-accent" />
      </div>

      <div className="relative flex-1 hidden border rounded-lg h-96 md:block border-primary">
        <Image
          src={"/escrow.png"}
          alt="image"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  )
}
