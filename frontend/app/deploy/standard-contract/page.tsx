"use client"
import { TransactionReceiptNotFoundErrorType, parseEther } from "viem"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useIsMounted } from "@/hooks/useIsMounted"
import { CreateStandardContractSchema } from "@/form-schema/schema"
import { revalidatePagePath } from "@/action/revalidate-path"

import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { SpinnerButton } from "@/components/spinner-button"
import { SimpleContractSkeleton } from "@/app/deploy/standard-contract/components/deploy-skeleton"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { storeContractAddress } from "@/action/db/store-contract-address"
import {
  sepolia,
  useAccount,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi"
import { standardContractAbi } from "@/constants/abi/abis"
import Escrow from "@/artifacts/contracts/Escrow.sol/Escrow.json"
import { toast } from "sonner"
import CustomConnectButton from "@/components/custom-connect-button"

//TODO: Clean up code and make components
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

  const standardContractForm = useForm<
    z.infer<typeof CreateStandardContractSchema>
  >({
    resolver: zodResolver(CreateStandardContractSchema),
    defaultValues: {
      arbiterAddress: "",
      beneficiaryAddress: "",
      amount: "",
    },
  })

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

          standardContractForm.reset()
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
    return <SimpleContractSkeleton />
  }
  return (
    <main className="container flex flex-col items-center space-y-5 ">
      <Card className="w-full px-8 py-12 space-y-12 dark:bg-secondary bg-secondary md:w-fit">
        <CardTitle>New Contract</CardTitle>
        <Form {...standardContractForm}>
          <form
            onSubmit={standardContractForm.handleSubmit(onSubmit)}
            className="space-y-12"
          >
            {/* Form fields for arbiter and beneficiary addresses */}
            <div className="space-y-8">
              <div className="md:gap-5 md:flex">
                <FormField
                  control={standardContractForm.control}
                  name="beneficiaryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beneficiary Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="md:w-80" />
                      </FormControl>
                      <FormDescription>
                        Address of the Beneficiary
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={standardContractForm.control}
                  name="arbiterAddress"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Arbiter Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="md:w-80" />
                      </FormControl>
                      <FormDescription>Address of the Arbiter</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="bg-primary" />

              {/* Form field for amount */}
              <FormField
                control={standardContractForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} className="md:w-80 " />
                    </FormControl>
                    <FormDescription>
                      Amount of Ethereum to send
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form buttons */}
            <CardFooter className="flex justify-between">
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => standardContractForm.reset()}
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
