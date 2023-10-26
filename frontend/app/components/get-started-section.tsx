import { HowItWorksSection } from "@/app/components/how-it-works-section"
import { CallToAction } from "@/components/call-to-action"
import { Separator } from "@/components/ui/separator"

/**
 * GetStartedSection component displays a section encouraging users to get started.
 */
export const GetStartedSection = () => {
  return (
    <div className="w-full bg-secondary">
      <div className="container flex flex-col items-center gap-16 py-16 rounded-lg">
        <h2 className="text-3xl font-semibold tracking-tight text-center scroll-m-20 ">
          Get Started Today
        </h2>
        <div className="space-y-12 md:space-y-0 md:gap-12 md:flex">
          <HowItWorksSection className="md:w-1/2" />

          <div>
            <Separator orientation="vertical" className="hidden md:block" />
            <Separator className="md:hidden" />
          </div>

          <CallToAction className="md:w-1/2" />
        </div>
      </div>
    </div>
  )
}
