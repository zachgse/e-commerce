import Box from "@/components/reusable/Box"

const DashboardContentSkeleton = () => {
  return (
    <div className='flex flex-col gap-24'>
      <div className="grid grid-cols-4 lg:gap-4 gap-24 place-items-center">
          {Array.from({length:4}).map((_,index) => (
            <div key={index} className="lg:col-span-1 col-span-2 w-32 h-24">
                <Box class="w-full aspect-square"/>
            </div>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto flex flex-col gap-2">
          <Box class="w-24 h-8"/>
          <Box class="w-full h-96"/>
        </div>
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto flex flex-col gap-2">
          <Box class="w-24 h-8"/>
          <Box class="w-full h-96"/>
        </div>
      </div>
    </div>
  )
}

export default DashboardContentSkeleton