import { getStandardContractInfo } from "@/action/contract-interactions/get-contract-info"

import { Card } from "@/components/ui/card"
import PageHeading from "@/app/contract/components/page-heading"
import AmountSection from "@/app/contract/standard/[address]/components/amount-section"
import ActionSection from "@/app/contract/standard/[address]/components/action-section/action-section"
import OwnerRow from "@/components/card-rows/owner-row"
import ArbiterRow from "@/components/card-rows/arbiter-row"
import RecipientRow from "@/components/card-rows/recipient-row"

export const dynamic = "force-dynamic"

const StandardContractPage = async ({
  params,
}: {
  params: { address: string }
}) => {
  const contractAddress = params.address
  const standardContractInfo = await getStandardContractInfo(contractAddress)
  const { deployer, arbiter, beneficiary } = standardContractInfo

  return (
    <main className="container flex flex-col items-center justify-center gap-5">
      <PageHeading contractAddress={contractAddress} />

      <Card className="flex flex-col w-full max-w-2xl gap-4 px-8 py-8 dark:bg-secondary bg-secondary">
        <OwnerRow owner={deployer} />
        <ArbiterRow arbiter={arbiter} />
        <RecipientRow beneficiary={beneficiary} />
        <AmountSection contractAddress={contractAddress} />

        <ActionSection contractAddress={contractAddress} />
      </Card>
    </main>
  )
}

export default StandardContractPage
