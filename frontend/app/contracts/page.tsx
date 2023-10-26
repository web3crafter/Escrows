import {
  getCustomizableContractInfo,
  getStandardContractInfo,
} from "@/action/contract-interactions/get-contract-info"
import { isFulfilled } from "@/lib/utils"
import { getSimpleContractAddressesFromDB } from "@/action/db/standard/get-contracts"
import { getCustomizableContractAddressesFromDB } from "@/action/db/customizable/get-contracts"
import { ICustomizableEscrow, IEscrow } from "@/types/types"
import ContractTypeTabs from "@/app/contracts/components/contract-type-tabs"

const ContractsPage = async () => {
  const standardAddressesFromDB = await getSimpleContractAddressesFromDB()
  const settledStandardPromises = await Promise.allSettled(
    standardAddressesFromDB.map(
      async (contractAddress) => await getStandardContractInfo(contractAddress)
    )
  )
  const standardContracts: IEscrow[] = settledStandardPromises
    .filter(isFulfilled)
    .map((result) => result.value)

  const customizableInfoFromDB = await getCustomizableContractAddressesFromDB()
  const settledCustomizablePromises = await Promise.allSettled(
    customizableInfoFromDB.map(async (contract) => {
      const result = await getCustomizableContractInfo(contract.address)
      return {
        contractAddress: contract.address,
        deployer: result.deployer,
        beneficiary: result.beneficiary,
        arbiters: contract.arbiters,
        managers: contract.managers,
        deposits: contract.deposits,
        approvals: contract.approvals,
      }
    })
  )
  const customizableContract: ICustomizableEscrow[] =
    settledCustomizablePromises
      .filter(isFulfilled)
      .map((result) => result.value)

  return (
    <main className="container px-4 sm:px-8">
      <ContractTypeTabs
        standardContracts={standardContracts}
        customizableContracts={customizableContract}
      />
    </main>
  )
}
export default ContractsPage
