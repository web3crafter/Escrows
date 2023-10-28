import { getCustomizableContractInfo } from "@/action/contract-interactions/get-contract-info"
import { getSpecificContractAddressFromDB } from "@/action/db/customizable/get-contracts"
import PageHeading from "@/app/contract/components/page-heading"
import ApprovalsSection from "@/app/contract/customizable/[address]/components/approvals-section"

import ContractSection from "@/app/contract/customizable/[address]/components/contract-section/contract-section"
import DepositSection from "@/app/contract/customizable/[address]/components/contract-section/deposit-section"
import { Card } from "@/components/ui/card"

const CustomizableContractPage = async ({
  params,
}: {
  params: { address: string }
}) => {
  const contractAddress = params.address
  const contractInfoFromSmartContract = await getCustomizableContractInfo(
    contractAddress
  )

  const contractInfoFromDB = await getSpecificContractAddressFromDB(
    contractAddress
  )

  if (!contractInfoFromSmartContract && !contractInfoFromDB) return null

  const deployer = contractInfoFromSmartContract.deployer
  const beneficiary = contractInfoFromSmartContract.beneficiary
  const arbiters = contractInfoFromDB.arbiters
  const managers = contractInfoFromDB.managers
  const deposits = contractInfoFromDB.deposits
  const approvals = contractInfoFromDB.approvals

  return (
    <main className="container flex flex-col items-center justify-center gap-5">
      <PageHeading contractAddress={contractAddress} />
      <div className="grid grid-cols-2 grid-rows-1 xl:grid-cols-4 xl:grid-rows-1 ">
        <DepositSection
          contractAddress={contractAddress as `0x${string}`}
          deposits={deposits}
          className="col-span-2 col-start-1 row-start-2  md:col-span-1 xl:col-span-1 xl:border xl:rounded-l-lg xl:row-start-1 xl:bg-secondary"
        />

        <ContractSection
          contractAddress={contractAddress}
          deployer={deployer}
          beneficiary={beneficiary}
          arbiters={arbiters}
          managers={managers}
          className="col-span-2 row-start-1 xl:col-span-2 xl:col-start-2 xl:border-t xl:border-b "
        />

        <ApprovalsSection
          contractAddress={contractAddress as `0x${string}`}
          beneficiary={beneficiary}
          approvals={approvals}
          className="col-span-2 row-start-3 md:col-span-1 md:row-start-2 xl:col-start-4 xl:border xl:rounded-r-lg xl:row-start-1 xl:bg-secondary"
        />
      </div>
    </main>
  )
}

export default CustomizableContractPage
