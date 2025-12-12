import React from 'react'
import OrderChart from './OrderChart'

type Chart = {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries;
}

const DashboardContent = () => {
  return (
    <div>
        <OrderChart/> 
    </div>
  )
}

export default DashboardContent