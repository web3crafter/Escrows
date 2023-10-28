import ContractTypeInfo from "@/components/contract-type-info"
import { Separator } from "@/components/ui/separator"

const escrowTypes = {
  standard: {
    title: "Standard contract",
    description: `Create a basic escrow contract by specifying an arbiter, 
    beneficiary, and the amount to be transferred. 
    This user-friendly option is for those seeking a 
    straightforward way to secure their agreements, 
    making it an ideal choice for uncomplicated transactions. 
    With its simplicity, you can confidently initiate 
    your financial arrangements.`,
    href: "standard-contract",
  },
  customizable: {
    title: "Customizable contract",
    description: `Customize your escrow contract with a wide range of options.
    Choose between one-time or multiple deposits, decide who can
    deposit (only the deployer or anyone), and even define the
    approval process (arbiter approval only or arbiter approval with
    the ability to select the transfer amount to the beneficiary).
    You're in control!`,
    href: "customizable-contract",
  },
}

/**
 * A React component representing a section for displaying two types of escrow contracts.
 */
export const EscrowTypeSection = () => {
  return (
    <div className="w-full bg-secondary dark:bg-secondary">
      <div className="container flex flex-col items-center gap-16 py-16 rounded-lg">
        <h2 className="text-3xl font-semibold tracking-tight text-center scroll-m-20">
          We offer two types of escrow contracts to suit your requirements
        </h2>
        <div className="space-y-12 md:space-y-0 md:gap-20 md:flex">
          <ContractTypeInfo
            title={escrowTypes.standard.title}
            description={escrowTypes.standard.description}
            href={escrowTypes.standard.href}
            callToActionClassName="mt-4"
          />
          <div>
            <Separator orientation="vertical" />
          </div>

          <ContractTypeInfo
            title={escrowTypes.customizable.title}
            description={escrowTypes.customizable.description}
            href={escrowTypes.customizable.href}
            callToActionClassName="mt-4"
          />
        </div>
      </div>
    </div>
  )
}
