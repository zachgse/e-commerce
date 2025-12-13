import OrderChart from './OrderChart'
import UserChart from './UserChat'


const DashboardContent = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <OrderChart />
        </div>

        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <UserChart />
        </div>
      </div>
    </div>
  )
}

export default DashboardContent