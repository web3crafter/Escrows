import { getStandardContractInfo } from "@/action/contract-interactions/get-contract-info"
import PageHeading from "@/app/contract/components/page-heading"
import ActionSection from "@/app/contract/standard/[address]/components/action-section/action-section"
import AddressInfoSection from "@/app/contract/standard/[address]/components/address-info-section"
import AmountSection from "@/app/contract/standard/[address]/components/amount-section"
import ContractArbiter from "@/components/card-rows/contract-arbiter"
import ContractOwner from "@/components/card-rows/contract-owner"
import ContractRecipient from "@/components/card-rows/contract-recipient"
import { Card } from "@/components/ui/card"

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
        <ContractOwner owner={deployer} />
        <ContractArbiter arbiter={arbiter} />
        <ContractRecipient beneficiary={beneficiary} />
        <AmountSection contractAddress={contractAddress} />

        <ActionSection contractAddress={contractAddress} />
      </Card>
    </main>
  )
}

export default StandardContractPage
