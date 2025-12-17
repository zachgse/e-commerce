import CountUp from "react-countup"
import type { DashboardStats } from "@/types/adminTypes"

type NumberStatsProps = {
  data?: DashboardStats
}

const NumberStats = ({data}:NumberStatsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 place-items-center">
        <div className="lg:col-span-1 col-span-2  w-32 h-24
                        flex flex-col place-items-center gap-1 p-2 font-bold">
            <p className='flex-1 text-4xl'>
              <CountUp end={data?.total_revenue ?? 0} prefix="₱" duration={2}/>
            </p>
            <p className="flex-none text-xs text-gray-500 text-right">Total revenue</p>
        </div>
        <div className="lg:col-span-1 col-span-2  w-32 h-24
                        flex flex-col place-items-center gap-1 p-2 font-bold">
            <p className='flex-1 text-4xl'>
              <CountUp end={data?.total_products_sold ?? 0} duration={2}/>
            </p>
            <p className="flex-none text-xs text-gray-500 text-right">Total products sold</p>
        </div>
        <div className="lg:col-span-1 col-span-2  w-32 h-24
                        flex flex-col place-items-center gap-1 p-2 font-bold">
            <p className='flex-1 text-4xl'>
              <CountUp end={data?.total_users ?? 0} duration={2}/>
            </p>
            <p className="flex-none text-xs text-gray-500 text-right">Total users</p>
        </div>
        <div className="lg:col-span-1 col-span-2  w-32 h-24
                        flex flex-col place-items-center gap-1 p-2 font-bold">
            <p className='flex-1 text-4xl'>
              <CountUp end={data?.avg_review ?? 0} duration={2}/>
            </p>
            <p className="flex-none text-xs text-gray-500 text-right">Average reviews</p>
        </div>
    </div>
  )
}

export default NumberStats