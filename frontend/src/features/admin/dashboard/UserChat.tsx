import React from 'react'
import { queryFetchChartUsers,useQueryFetchChartUsers } from '@/services/queries/adminQueries'
import clsx from 'clsx'
import Loading from '@/components/Loading'
import ChartDashboard from '@/components/reusable/ChartDashboard'

const UserChart = () => {
    const [currentYear,setCurrentYear] = React.useState<number>(new Date().getFullYear());
    const { data:list,isFetching } = useQueryFetchChartUsers(currentYear);   
    const orders = list?.data_for_selected_year ?? [];
    
    const handleClick = (year:number) => {
        queryFetchChartUsers(year);
        setCurrentYear(year);
    }

    return (
        <div className='flex flex-col gap-2'>
            <b>Registered Users</b>
            <div className="flex gap-1">
                {list?.years_available &&  list?.years_available?.length > 0 && 
                    list.years_available.map((year) => (
                        <div key={year} onClick={() => handleClick(year)}
                            className={clsx('border-1 border-gray-300 p-1 px-4 py-1 rounded-full cursor-pointer',
                                            currentYear == year && "bg-blue-500 text-white"
                            )}>
                            {year}
                        </div>
                    ))}
            </div>
            {isFetching ? (<Loading/>) : (
                <ChartDashboard data_for_selected_year={orders}
                                years_available={list?.years_available ?? []}
                                id='user-chart' 
                                name='Number of registered users' 
                                type='line'/>  
            )}
        </div>
    )
}

export default UserChart