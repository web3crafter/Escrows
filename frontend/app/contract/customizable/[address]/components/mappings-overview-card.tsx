"use client"

import { useEffect, useState } from "react"
import { MoveRight } from "lucide-react"

import {
  MappingInfo,
  getMappingInfo,
} from "@/action/contract-interactions/get-mapping-info "
import { formatAddress } from "@/lib/utils"

import { HoverCopy } from "@/components/hover-copy"
import { MappingType } from "@/types/types"

interface DepositsOverviewProps {
  contractAddress: `0x${string}`
  addressArr: string[]
  functionName: MappingType
}
const MappingOverviewCard = ({
  contractAddress,
  addressArr,
  functionName,
}: DepositsOverviewProps) => {
  const [mappingInfo, setMappingInfo] = useState<MappingInfo[]>([])

  useEffect(() => {
    const fetchMappingInfo = async () => {
      const result = await getMappingInfo(
        contractAddress,
        addressArr,
        functionName
      )
      setMappingInfo(result)
    }
    fetchMappingInfo()
  }, [contractAddress, addressArr, functionName])

  return (
    <div className="p-2 flex flex-col  gap-2 w-fit">
      <p className="capitalize font-semibold">{functionName}</p>
      {mappingInfo.map((info, i) => {
        return (
          <div key={i} className="flex gap-2 items-center">
            <HoverCopy
              trigger={formatAddress(info.address)}
              content={info.address}
            />
            <MoveRight className="text-green-500" />
            <p>{info.amount} ETH</p>
          </div>
        )
      })}
    </div>
  )
}
export default MappingOverviewCard
