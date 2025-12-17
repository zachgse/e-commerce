import React from "react"
import { queryFetchProductStats } from "@/services/queries/adminQueries"
import Box from "@/components/reusable/Box"
import { FaStar } from "react-icons/fa"
import Loading from "@/components/Loading"
import Pill from "@/components/reusable/Pill"
import { nice_display_format } from "@/utils/helper"
import { ArrowUpDown, ArrowUp,ArrowDown } from "lucide-react"
import type { ProductStats } from "@/types/adminTypes"

type FilterTypes = {
    filterBy: string
    filterOrder?: string
}

type TopProductStatsType = {
    data?: ProductStats
    types: string[]
    filters: FilterTypes
    setFilters: React.Dispatch<React.SetStateAction<FilterTypes>>
    isFetching: boolean
}

const TopProductStats = ({data,types,filters,setFilters,isFetching}:TopProductStatsType) => {
    const handleClick = (type:string,value:string) => {
        if (type == "filter") {
            setFilters({
                filterBy:value,
                filterOrder: ""
            })
        } else {
            setFilters(prev => ({
                ...prev,filterOrder:value
            }));
        }
        queryFetchProductStats(filters.filterBy,filters.filterOrder);
    }
    
    return (
        <div className="flex flex-col gap-2">
            <p className='flex items-center gap-1 font-bold'>
                Top 5 Products {!filters.filterOrder ? <ArrowUpDown onClick={() => handleClick("sort","ASC")} 
                                                    className="w-3 h-3 cursor-pointer"/> : (
                    filters.filterOrder == "ASC" ? <ArrowUp onClick={() => handleClick("sort","DESC")} className="w-3 h-3 cursor-pointer"/> 
                                                : <ArrowDown onClick={() => handleClick("sort","ASC")} className="w-3 h-3 cursor-pointer"/>
                )}
            </p>
            <div className="flex gap-1 mb-4">
                {types.map((type,index) => (
                    <Pill key={index} 
                        name={nice_display_format(type.replace("_"," "))} 
                        isActive={filters.filterBy == type}
                        onClick={() => handleClick("filter",type)}/>
                ))}
            </div>
            {isFetching ? <Loading/> : (
            <table className="w-full table-fixed">
                <colgroup>
                    <col className="lg:w-2/6 w-1/2"/>
                    <col className="lg:w-4/6 w-1/2"/>
                </colgroup>
                <tbody>
                    {data?.map((d,index:number) => (
                    <tr key={index}>
                        <td className="border-r border-gray-300 py-4 
                                    flex justify-center items-center gap-8">
                            <p className="font-bold">{index+1}.</p>
                            {d.image ? (
                                <img className="w-16 h-16" src={d.image} alt={d.name} />
                            ) : <Box class="w-16 h-16"/>}
                        </td>
                        <td className="pl-6">
                            <p className="inline-flex items-center gap-1">
                                <span className="font-bold">{d.name}</span> 
                                {filters.filterBy == "ratings" && (
                                    <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                                        ( {d.avg_rating} <FaStar className="text-yellow-500 w-3 h-3"/> )
                                    </span>
                                )}
                                {filters.filterBy == "sold" && (
                                    <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                                        ( {d.total_sold} pc/s )
                                    </span>
                                )}
                                {filters.filterBy == "stocks" && (
                                    <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                                        ( {d.stock} pc/s )
                                    </span>
                                )}
                            </p>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}

export default TopProductStats