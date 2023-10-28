import RoleSelect from "@/app/contracts/components/role-select"
import { Label } from "@/components/ui/label"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EscrowType, FilterKey } from "@/types/types"

interface TabsNavProps {
  setActiveTab: React.Dispatch<React.SetStateAction<EscrowType>>
  keyToFilterOn: FilterKey
  setKeyToFilterOn: React.Dispatch<React.SetStateAction<FilterKey>>
  activeTab: EscrowType
}
const TabsNav = ({
  setActiveTab,
  keyToFilterOn,
  setKeyToFilterOn,
  activeTab,
}: TabsNavProps) => {
  return (
    <div className="w-full sm:flex sm:items-end sm:justify-between">
      <div className="flex flex-col">
        <Label htmlFor="contract-type">Contract Type</Label>
        <TabsList id="contract-type" className="px-0 w-fit">
          <TabsTrigger
            value="standard"
            onClick={() => {
              setActiveTab("standard")
              if (keyToFilterOn === "managers") {
                setKeyToFilterOn("all_contracts")
              } else if (keyToFilterOn === "arbiters") {
                setKeyToFilterOn("arbiter")
              }
            }}
          >
            Standard
          </TabsTrigger>

          <TabsTrigger
            value="customizable"
            onClick={() => {
              setActiveTab("customizable")
              if (keyToFilterOn === "arbiter") {
                setKeyToFilterOn("arbiters")
              }
            }}
          >
            Customizable
          </TabsTrigger>
        </TabsList>
      </div>

      <RoleSelect
        className="sm:self-end"
        activeTab={activeTab}
        setKeyToFilterOn={setKeyToFilterOn}
        displayValue={keyToFilterOn}
      />
    </div>
  )
}
export default TabsNav
