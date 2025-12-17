import React from 'react'
import { useQueries } from '@tanstack/react-query'
import { queryFetchChart, queryFetchDashboardStats,queryFetchProductStats,queryFetchTransactionStats } from '@/services/queries/adminQueries'
import NumberStats from './NumberStats'
import ProductStats from './TopProductStats'
import PaymentStats from './PaymentStats'
import ChartDashboard from './ChartDashboard'

const DashboardContent = () => {
  const CURRENT_YEAR = new Date().getFullYear()
  const [productStatFilter,setProductStatFilter] = React.useState({
    filterBy: "ratings"
  });
  const [orderYearFilter,setOrderYearFilter] = React.useState<number>(CURRENT_YEAR);
  const [paymentYearFilter,setPaymentYearFilter] = React.useState<number>(CURRENT_YEAR);
  const data = useQueries({
    queries: [
      queryFetchDashboardStats(),
      queryFetchProductStats(productStatFilter.filterBy),
      queryFetchTransactionStats(),
      queryFetchChart("orders",orderYearFilter),
      queryFetchChart("payments",paymentYearFilter)
    ]
  })
  return (
    <div className='flex flex-col gap-8'>
      <NumberStats data={data[0]?.data}/>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <ProductStats data={data[1]?.data} 
                        types={['ratings',"sold","stocks"]}
                        filters={productStatFilter}
                        setFilters={setProductStatFilter}
                        isFetching={data[1].isFetching}/>
        </div>
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <PaymentStats data={data[2]?.data}/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <ChartDashboard data={data[3]?.data} 
                          isFetching={data[3]?.isFetching}
                          currentYear={orderYearFilter}
                          setCurrentYear={setOrderYearFilter}
                          module="orders"
                          name="Orders"
                          label="Number of orders"
                          id="orders-chart"
                          type="bar"/>
        </div>
        <div className="col-span-2 lg:col-span-1 w-full min-w-0 mx-auto">
          <ChartDashboard data={data[4]?.data} 
                          isFetching={data[4]?.isFetching}
                          currentYear={paymentYearFilter}
                          setCurrentYear={setPaymentYearFilter}
                          module="payments"
                          name="Payments"
                          label="Total amount of payment"
                          id="payments-chart"
                          type="line"/>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent