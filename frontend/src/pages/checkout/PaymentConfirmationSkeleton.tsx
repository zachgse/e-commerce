import Box from "../../components/reusable/Box"

const PaymentConfirmationSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 mt-24">
        <Box class="w-14 h-14 rounded-full"/>
        <Box class="w-44 h-6"/>
        <Box class="w-28 h-5"/>
        <Box class="w-36 h-4"/>
    </div>
  )
}

export default PaymentConfirmationSkeleton