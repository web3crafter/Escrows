import { GetStartedSection } from "@/app/components/get-started-section"
import { EscrowTypeSection } from "@/app/components/escrow-types-section"
import { HeroSection } from "@/app/components/hero-section"
import { PointersSection } from "@/app/components/pointers-section"

export default async function Home() {
  // revalidatePagePath("/contracts")

  return (
    <main className="flex flex-col items-center gap-16 ">
      <HeroSection />
      <EscrowTypeSection />
      <PointersSection />
      <GetStartedSection />
    </main>
  )
}
