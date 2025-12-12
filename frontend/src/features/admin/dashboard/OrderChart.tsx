import { queryFetchChartOrders, useFetchChartOrders } from '@/services/queries/adminQueries';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import Chart from "react-apexcharts"

type OrderChartProps = {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries;
}

const OrderChart = () => {
    const [currentYear,setCurrentYear] = React.useState<number>(new Date().getFullYear());
    const queryClient = useQueryClient();
    const { data:list} = useFetchChartOrders(currentYear);   
    const orders = list?.data_for_selected_year ?? [];
    
    const options: ApexCharts.ApexOptions = {
        chart: {
            id: "basic-bar",
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: orders?.map(o => o.month),
        },
    };

    const series: ApexAxisChartSeries = [
        {
            name: "Number of orders",
            data: orders?.map(o => o.count)
        },
    ];

    React.useEffect(() => {
        list?.years_available.forEach((year) => queryClient.prefetchQuery(queryFetchChartOrders(year)));
    },[]);

    const handleClick = (year:number) => {
        queryFetchChartOrders(year);
        setCurrentYear(year);
    }

    return (
        <div>
            <b>OrderChart</b>
            <div className="flex gap-4">
                {list?.years_available &&  list?.years_available?.length > 0 && 
                    list.years_available.map((year) => (
                        <div key={year} className='cursor-pointer'
                            onClick={() => handleClick(year)}>
                            {year}
                        </div>
                    ))}
            </div>
            <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
            />
            Orders for {currentYear}    
        </div>
    )
}

export default OrderChart