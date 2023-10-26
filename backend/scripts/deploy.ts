import { ethers } from "hardhat"
import { Contract } from "../../frontend/types/types"
import Escrow from "../../frontend/artifacts/contracts/Escrow.sol/Escrow.json"
import { ContractRunner } from "ethers"

export default function deploy(signer: ContractRunner, contract: Contract) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  )
  const value = contract.amount
  return factory.deploy(contract.arbiterAddress, contract.beneficiaryAddress, {
    value,
  })
}

// deploy().catch((error) => {
//   console.error(error)
//   process.exitCode = 1
// })
