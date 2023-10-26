import { getCustomizableContractInfo } from "@/action/contract-interactions/get-contract-info"
import { getSpecificContractAddressFromDB } from "@/action/db/customizable/get-contracts"
import PageHeading from "@/app/contract/components/page-heading"
import ApprovalsSection from "@/app/contract/customizable/[address]/components/approvals-section"

import ContractSection from "@/app/contract/customizable/[address]/components/contract-section/contract-section"
import DepositSection from "@/app/contract/customizable/[address]/components/contract-section/deposit-section"

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
          className="flex flex-col justify-between w-full col-span-2 col-start-1 row-start-2 p-6 md:col-span-1 xl:col-span-1 xl:border-r xl:row-start-1"
        />

        <ContractSection
          contractAddress={contractAddress}
          deployer={deployer}
          beneficiary={beneficiary}
          arbiters={arbiters}
          managers={managers}
          className="flex flex-col col-span-2 row-start-1 gap-8 px-4 py-6 md:px-8 xl:col-span-2 xl:col-start-2 "
        />

        <ApprovalsSection
          contractAddress={contractAddress as `0x${string}`}
          beneficiary={beneficiary}
          approvals={approvals}
          className="flex flex-col justify-between w-full col-span-2 row-start-3 p-6 md:col-span-1 md:row-start-2 xl:col-start-4 xl:border-l xl:row-start-1"
        />
      </div>
    </main>
  )
}

export default CustomizableContractPage
