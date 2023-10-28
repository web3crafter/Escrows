"use client"
import { TransactionReceiptNotFoundErrorType, parseEther } from "viem"
import { useState } from "react"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { toast } from "sonner"

import Escrow from "@/artifacts/contracts/Escrow.sol/Escrow.json"
import { standardContractAbi } from "@/constants/abi/abis"
import { storeContractAddress } from "@/action/db/store-contract-address"
import { revalidatePagePath } from "@/action/revalidate-path"
import { CreateStandardContractSchema } from "@/form-schema/schema"
import { useIsMounted } from "@/hooks/useIsMounted"
import { useValidatedForms } from "@/hooks/useValidatedForms"

import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { SpinnerButton } from "@/components/spinner-button"
import CustomConnectButton from "@/components/custom-connect-button"
import StandardDeploySkeleton from "@/app/deploy/standard-contract/components/standard-deploy-skeleton"
import { Form } from "@/components/ui/form"
import {
  sepolia,
  useAccount,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi"
import DeployStandardFormField from "@/app/deploy/standard-contract/components/deploy-standard-form-field"

const StandardContractPage = () => {
  const isMounted = useIsMounted()
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >()
  const { data: walletClient } = useWalletClient({
    chainId: sepolia.id,
  })

  const { createStandardContractForm } = useValidatedForms()

  const { data: deployedContract, status: deploymentStatus } =
    useWaitForTransaction({
      hash: transactionHash,
      confirmations: 1,
      async onSuccess(data) {
        const contractAddress = data.contractAddress
        if (contractAddress) {
          await storeContractAddress(contractAddress)

          toast.message("Escrow Contract Deployed", {
            description: `Contract Address: ${contractAddress}`,
          })

          createStandardContractForm.reset()
          await revalidatePagePath("/contracts")
          router.push(`/contract/standard/${contractAddress}`)
        }
      },
      onError(e) {
        const error = e as TransactionReceiptNotFoundErrorType
        console.log("error:", error.shortMessage)

        toast.error(
          <div className="flex flex-col bg-red-500">
            <p>Error</p>
            <p>{error.shortMessage}</p>
          </div>
        )
      },
    })

  const onSubmit = async (
    values: z.infer<typeof CreateStandardContractSchema>
  ) => {
    if (!isConnected) return console.log("Not Connected")

    const arbiter = values.arbiterAddress
    const beneficiary = values.beneficiaryAddress
    const amount = parseEther(values.amount)

    const escrowContract = await walletClient?.deployContract({
      abi: standardContractAbi,
      account: address,
      args: [arbiter as `0x${string}`, beneficiary as `0x${string}`],
      bytecode: Escrow.bytecode as `0x${string}`,
      value: amount,
    })

    setTransactionHash(escrowContract)
  }

  if (!isMounted) {
    return <StandardDeploySkeleton />
  }
  return (
    <main className="container flex flex-col items-center space-y-5 ">
      <Card className="w-full px-8 py-12 space-y-12 dark:bg-secondary bg-secondary md:w-fit">
        <CardTitle>New Contract</CardTitle>
        <Form {...createStandardContractForm}>
          <form
            onSubmit={createStandardContractForm.handleSubmit(onSubmit)}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="md:gap-5 md:flex">
                <DeployStandardFormField
                  createStandardContractForm={createStandardContractForm}
                  name="beneficiaryAddress"
                  label="Recipient Address"
                />
                <DeployStandardFormField
                  createStandardContractForm={createStandardContractForm}
                  name="arbiterAddress"
                  label="Arbiter Address"
                />
              </div>

              <Separator className="bg-primary" />

              <DeployStandardFormField
                createStandardContractForm={createStandardContractForm}
                name="amount"
                label="Amount"
                description="Amount of Ethereum to send"
              />
            </div>

            <CardFooter className="flex justify-between">
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => createStandardContractForm.reset()}
                className="mt-5 "
              >
                Reset
              </Button>
              {isConnected ? (
                <SpinnerButton
                  type="submit"
                  disabled={deploymentStatus === "loading"}
                  loading={deploymentStatus === "loading"}
                  className="w-full mt-5 sm:w-fit bg-gradient-to-r from-primary to-accent hover:bg-primary"
                >
                  Deploy
                </SpinnerButton>
              ) : (
                <CustomConnectButton />
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  )
}
export default StandardContractPage
