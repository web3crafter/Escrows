export type ContractCreation = {
  arbiters: string[]
  managers: string[]
  beneficiary: string
  amount: string
}

export interface IEscrow {
  contractAddress: string
  deployer: string
  beneficiary: string
  arbiter: string
}

export interface ICustomizableEscrow {
  contractAddress: string
  deployer: string
  arbiters: string[]
  beneficiary: string
  managers: string[]
  deposits: string[]
  approvals: string[]
}
export interface RetrievedStandardInfoFromSmartContract {
  contractAddress: string
  deployer: string
  beneficiary: string
  arbiter: string
}

export interface RetrievedCustomizableInfoFromSmartContract {
  deployer: `0x${string}`
  beneficiary: `0x${string}`
  requestAmount: string
  totalReleasedAmount: string
  balance: string
}

export type EscrowType = "standard" | "customizable"

export type MappingType = "deposits" | "approvals"

export type PromiseResult<T> =
  | {
      status: "fulfilled"
      value: T
    }
  | {
      status: "rejected"
      reason: any
    }

export type FilterKey =
  | "all_contracts"
  | "deployer"
  | "beneficiary"
  | "arbiter"
  | "arbiters"
  | "managers"

export type ConfirmationButtonText =
  | "Waiting for confirmation"
  | "Transaction pending"
  | "Deploy"
  | "Approve"
  | "Deposit"
