import Box from "@/components/reusable/Box"

const DashboardContentSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <div className="flex flex-col gap-1">
            <Box class="w-12 h-4"/>
            <Box class="w-24 h-4"/>
            <Box class="w-full h-80"/>
          </div>
        </div>
        
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <div className="flex flex-col gap-1">
            <Box class="w-12 h-4"/>
            <Box class="w-24 h-4"/>
            <Box class="w-full h-80"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContentSkeleton