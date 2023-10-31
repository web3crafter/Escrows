import ContractTypeInfo from "@/components/contract-type-info"
import { Separator } from "@/components/ui/separator"

const escrowTypes = {
  simple: {
    title: "standard contract",
    description: (
      <div className="flex flex-col space-y-2 text-center md:space-y-4 sm:text-lg">
        <p className="hover:scale-105">
          In this contract version, you select an{" "}
          <span className="font-semibold">amount</span> of Ethereum to send to a{" "}
          <span className="font-semibold">recipient</span>
        </p>
        <p className="hover:scale-105">
          You also choose an <span className="font-semibold">arbiter</span> to{" "}
          <span className="font-semibold">verify</span> and{" "}
          <span className="font-semibold">execute</span> the transaction,
          ensuring the Ethereum reaches the recipient.
        </p>
        <p className="hover:scale-105">
          Once the arbiter <span className="font-semibold">approves</span> and
          the transaction is <span className="font-semibold">successful</span>,
          you have the option to deposit another value and repeat the process.
        </p>
        <p className="hover:scale-105">
          <span className="font-semibold">However</span>, it&apos;s important to
          note that you <span className="font-semibold">cannot</span> change the
          chosen arbiter or Recipient.
        </p>
      </div>
    ),
    href: "standard-contract",
  },
  advanced: {
    title: "customizable contract",
    description: (
      <div className="flex flex-col space-y-2 text-center md:space-y-4 sm:text-lg">
        <p className="hover:scale-105">
          In this contract version, you have the{" "}
          <span className="font-semibold">flexibility</span> to{" "}
          <span className="font-semibold">customize</span> the contract
          according to your specific{" "}
          <span className="font-semibold">requirements</span>.
        </p>
        <p className="hover:scale-105">
          You can choose <span className="font-semibold">one</span> or{" "}
          <span className="font-semibold">more</span> arbiters, and{" "}
          <span className="font-semibold">one</span> or{" "}
          <span className="font-semibold">more</span> managers, with the{" "}
          <span className="font-semibold">power</span> to add or remove
          arbiters.
        </p>
        <p className="hover:scale-105">
          Additionally, you can <span className="font-semibold">change</span>{" "}
          both <span className="font-semibold">managers</span> and{" "}
          <span className="font-semibold">arbiters</span> as needed.
        </p>
        <p className="hover:scale-105">
          <span className="font-semibold">Furthermore</span>, beneficiaries also
          have the option to <span className="font-semibold">request</span> a
          transaction. It&apos;s all{" "}
          <span className="font-semibold">entirely</span> up to{" "}
          <span className="font-semibold">your</span> discretion!
        </p>
      </div>
    ),
    href: "customizable-contract",
  },
}

const CreateContractPage = () => {
  return (
    <main className="container flex flex-col items-center w-full gap-16 text-center">
      <h2 className="pb-2 text-3xl font-semibold tracking-tight md:text-4xl scroll-m-20 first:mt-0">
        We offer two types of contracts to suit your requirements!
      </h2>

      <div className="space-y-8 md:space-y-0 md:gap-16 md:flex ">
        <ContractTypeInfo
          title={escrowTypes.simple.title}
          description={escrowTypes.simple.description}
          href={escrowTypes.simple.href}
          className="md:flex-1"
          deployPage={true}
          callToActionClassName="text-base"
        />
        <div>
          <Separator orientation="vertical" className="hidden md:block" />
          <Separator className="md:hidden " />
        </div>
        <ContractTypeInfo
          title={escrowTypes.advanced.title}
          description={escrowTypes.advanced.description}
          href={escrowTypes.advanced.href}
          className="md:flex-1"
          deployPage={true}
          callToActionClassName="text-base"
        />
      </div>
    </main>
  )
}
export default CreateContractPage
