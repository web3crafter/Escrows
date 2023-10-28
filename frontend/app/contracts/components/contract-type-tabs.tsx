"use client"

import { useState } from "react"
import { useAccount } from "wagmi"

import {
  IEscrow,
  ICustomizableEscrow,
  EscrowType,
  FilterKey,
} from "@/types/types"
import { useIsMounted } from "@/hooks/useIsMounted"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContractsRenderer from "@/app/contracts/components/contracts-renderer"
import NoRoleNotConnected from "@/app/contracts/components/no-role-not-connected"
import RoleSelect from "@/app/contracts/components/role-select"
import { Label } from "@/components/ui/label"
import TabsNav from "@/app/contracts/components/tabs-nav"

interface ContractTypeTabsProps {
  standardContracts: IEscrow[]
  customizableContracts: ICustomizableEscrow[]
}
const ContractTypeTabs = ({
  standardContracts,
  customizableContracts,
}: ContractTypeTabsProps) => {
  const [activeTab, setActiveTab] = useState<EscrowType>("standard")
  const [keyToFilterOn, setKeyToFilterOn] = useState<FilterKey>("all_contracts")
  const isMounted = useIsMounted()
  const { address: accountAddress } = useAccount()

  const filterContracts = () => {
    if (activeTab === "standard") {
      return standardContracts.filter((contract) => {
        if (keyToFilterOn === "arbiters" || keyToFilterOn === "managers") return
        if (keyToFilterOn === "all_contracts") {
          return contract
        }
        if (contract[keyToFilterOn] === accountAddress) {
          return contract
        }
      })
    } else {
      return customizableContracts.filter((contract) => {
        if (keyToFilterOn === "arbiter") return
        if (keyToFilterOn === "all_contracts") {
          return contract
        } else if (contract[keyToFilterOn] === accountAddress) {
          return contract
        } else if (contract[keyToFilterOn].includes(accountAddress as string)) {
          return contract
        }
      })
    }
  }

  const filteredContract = filterContracts()

  if (!isMounted) return null
  return (
    <Tabs
      defaultValue="standard"
      className="flex flex-col items-center space-y-4"
    >
      <TabsNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        keyToFilterOn={keyToFilterOn}
        setKeyToFilterOn={setKeyToFilterOn}
      />
      <TabsContent value="standard" className="w-full">
        {filteredContract.length > 0 ? (
          <ContractsRenderer contracts={filteredContract} />
        ) : (
          <NoRoleNotConnected keyToFilterOn={keyToFilterOn} />
        )}
      </TabsContent>
      <TabsContent value="customizable" className="w-full">
        {filteredContract.length > 0 ? (
          <ContractsRenderer contracts={filteredContract} />
        ) : (
          <NoRoleNotConnected keyToFilterOn={keyToFilterOn} />
        )}
      </TabsContent>
    </Tabs>
  )
}
export default ContractTypeTabs
