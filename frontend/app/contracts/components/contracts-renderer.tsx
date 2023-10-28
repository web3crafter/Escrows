import CustomizableContractCard from "@/app/contracts/components/customizable/customizable-contract-card"
import StandardContractCard from "@/app/contracts/components/standard/standard-contract-card"
import { IEscrow, ICustomizableEscrow } from "@/types/types"
import { z } from "zod"

const IEscrowSchema = z.object({
  contractAddress: z.string(),
  deployer: z.string(),
  beneficiary: z.string(),
  arbiter: z.string(),
})
const IEscrowArray = z.array(IEscrowSchema)

const ICustomizableEscrowSchema = z.object({
  contractAddress: z.string(),
  deployer: z.string(),
  arbiters: z.array(z.string()),
  beneficiary: z.string(),
  managers: z.array(z.string()),
  deposits: z.array(z.string()),
  approvals: z.array(z.string()),
})

const ICustomizableArray = z.array(ICustomizableEscrowSchema)

interface ContractsRendererProps {
  contracts: (IEscrow | ICustomizableEscrow)[]
}
const ContractsRenderer = ({ contracts }: ContractsRendererProps) => {
  const validatedIEscrow = IEscrowArray.safeParse(contracts)
  const validatedICustomizableEscrow = ICustomizableArray.safeParse(contracts)

  return (
    <div className="flex flex-col items-center space-y-4 xl:space-y-0 xl:grid-cols-2 xl:grid xl:gap-4">
      {validatedIEscrow.success &&
        validatedIEscrow.data.length > 0 &&
        validatedIEscrow.data.map((individualContract) => (
          <StandardContractCard
            key={individualContract?.contractAddress}
            contract={individualContract}
            className="w-full max-w-2xl px-2 sm:px-8"
          />
        ))}

      {validatedICustomizableEscrow.success &&
        validatedICustomizableEscrow.data.length > 0 &&
        validatedICustomizableEscrow.data.map((individualContract) => (
          <CustomizableContractCard
            key={individualContract.contractAddress}
            contract={individualContract}
            className="w-full max-w-2xl px-2 sm:px-8 h-full"
          />
        ))}
    </div>
  )
}
export default ContractsRenderer
