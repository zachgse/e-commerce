import React from 'react'
import type { ChartType } from '@/types/adminTypes'
import { queryFetchChart } from '@/services/queries/adminQueries'
import Loading from '@/components/Loading'
import ChartComponent from '@/components/reusable/ChartComponent'
import Pill from '@/components/reusable/Pill'

type ChartDashboardProps = {
    data?: ChartType
    isFetching: boolean
    currentYear: number
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>
    module: string
    name: string
    label: string
    id: string
    type: "bar" | "line"
}

const ChartDashboard = ({
    data,
    isFetching,
    currentYear,
    setCurrentYear,
    module,
    name,
    label,
    type,
    id
}:ChartDashboardProps) => {
    const handleClick = (year:number) => {
        queryFetchChart(module,year)
        setCurrentYear(year);
    }

    return (
        <div className='flex flex-col gap-2'>
            <b>{name}</b>
            <div className="flex gap-1">
                {data?.years_available &&  data?.years_available?.length > 0 && 
                    data.years_available.map((year) => (
                        <Pill key={year} name={year} isActive={currentYear == year} 
                            onClick={() => handleClick(year)}/>
                    ))}
            </div>
            {isFetching ? (
                <Loading/>
            ) : (
                <ChartComponent data_for_selected_year={data?.data_for_selected_year ?? []}
                                years_available={data?.years_available ?? []}
                                id={id}
                                label={label} 
                                type={type}/>    
            )}
        </div>
    )
}

export default ChartDashboard