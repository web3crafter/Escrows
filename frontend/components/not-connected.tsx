import CustomConnectButton from "@/components/custom-connect-button"

const NotConnected = () => {
  return (
    <div className="flex flex-col items-center justify-center border p-8 rounded-lg space-y-8">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        You Need to connect your wallet
      </h3>
      <CustomConnectButton />
    </div>
  )
}
export default NotConnected
