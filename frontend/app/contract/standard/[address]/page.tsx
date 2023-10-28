import { getStandardContractInfo } from "@/action/contract-interactions/get-contract-info"

import { Card } from "@/components/ui/card"
import PageHeading from "@/app/contract/components/page-heading"
import ActionSection from "@/components/standard/action-section/action-section"
import DeployerSection from "@/components/standard/deployer-section"
import ArbiterSection from "@/components/standard/arbiter-section"
import BeneficiarySection from "@/components/standard/beneficiary-section"

export const dynamic = "force-dynamic"

const StandardContractPage = async ({
  params,
}: {
  params: { address: string }
}) => {
  //TODO: zod validation on contractAddress
  const contractAddress = params.address
  const standardContractInfo = await getStandardContractInfo(contractAddress)
  const { deployer, arbiter, beneficiary } = standardContractInfo

  return (
    <main className="container flex flex-col items-center justify-center gap-5">
      <PageHeading contractAddress={contractAddress} />

      <Card
        key={contractAddress}
        className="flex flex-col w-full h-full max-w-2xl px-2 py-8 space-y-8 sm:px-8"
      >
        <div className="space-y-4">
          <DeployerSection
            deployer={deployer}
            contractAddress={contractAddress}
          />
          <ArbiterSection arbiter={arbiter} contractAddress={contractAddress} />
          <BeneficiarySection
            beneficiary={beneficiary}
            contractAddress={contractAddress}
          />
        </div>
        <ActionSection contractAddress={contractAddress} />
      </Card>
    </main>
  )
}

export default StandardContractPage
