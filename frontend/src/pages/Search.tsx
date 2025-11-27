import { useState } from 'react'  
import { useSearchParams,Link } from 'react-router'
import { useFetchFullSearchProducts } from '../features/products/productQueries'
import type { Product } from '../features/products/productType'
import ProductListSkeleton from '../components/products/list/ProductListSkeleton'
import Box from '../components/reusable/Box'
import { money_format } from '../helpers/helper'
import { FaRegLightbulb } from "react-icons/fa"

type SortBy = "asc" | "desc" | "";

function isSortBy(value: string): value is Exclude<SortBy, null> {
  return value === "asc" || value === "desc";
}

const Search = () => {
    let [params, setParams] = useSearchParams();
  
    const keyword = params.get("keyword") ?? "";
    let sortByParam = params.get("sortBy")?.toLowerCase() ?? "";

    if (sortByParam !== "" && !isSortBy(sortByParam)) {
        return <div>Error filtering</div>;
    }

    const sortBy: SortBy = sortByParam === "" ? "" : sortByParam;

    const { data:searchedProducts=[],
        isLoading,
        isError,
        error} = useFetchFullSearchProducts({keyword,sortBy});
    const [selectedFilter,setSelectedFilter] = useState<{ [key: string]: string }>({});
    
    if (isLoading) {
        <div className="flex flex-col gap-4">
            {/* <Box class='' */}
            <ProductListSkeleton/>
        </div>
        
    }

    if (isError && error) {
        return <div>Error</div>
    }

    const setParam = (key:string, value:string|null) => {
        setParams(prev => {
            const p = new URLSearchParams(prev);
            if (value === null) p.delete(key);
            else p.set(key, value);
            return p;
        });
    };

    const handleSortAsc = () => setParam("sortBy", "asc");
    const handleSortDesc = () => setParam("sortBy", "desc");
    const handleClearSort = () => setParam("sortBy", null);

    return (
    <div className="flex flex-col gap-8">
        <div className='flex items-center gap-2 text-lg'>
            <FaRegLightbulb className='w-4 h-4'/>
            Search results for: <span className='font-bold'>"{keyword}"</span>
        </div>
        <div className="w-full bg-gray-100 h-16 flex items-center gap-4 px-6">
            Sort by
            <div
            onClick={handleSortAsc}
            className={`w-auto h-auto cursor-pointer px-4 ${
                selectedFilter['sort'] === 'asc' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            >
            Low to High
            </div>

            <div
            onClick={handleSortDesc}
            className={`w-auto h-auto cursor-pointer px-4 ${
                selectedFilter['sort'] === 'desc' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            >
            High to Low
            </div>
            <div onClick={handleClearSort} 
                className='w-auto h-auto bg-white cursor-pointer px-4'>
                Clear Filter
            </div>
            {/* <select className='w-auto h-auto bg-white px-4'>
                <option value="Low to High">Price: Low to High</option>
                <option value="High to Low">Price: High to Low</option>
            </select> */}
            {/* make this a dropdown of ratings instead */}
            {/* <div className='w-auto h-6 bg-white flex items-center gap-1 px-4'> 
                <FaStar className='w-4 h-4 text-yellow-500'/>
                <FaStar className='w-4 h-4 text-yellow-500'/>
                <FaStar className='w-4 h-4 text-yellow-500'/>
                <FaStar className='w-4 h-4 text-yellow-500'/>
                <FaStar className='w-4 h-4 text-yellow-500'/>
            </div> */}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {searchedProducts && searchedProducts.length > 0 ?
                searchedProducts.map((product:Product,index:number) => (
                <Link to={`/product/${product.slug}`} key={index}
                    className="border border-gray-300 flex flex-col gap-1 p-4">
                    {product.thumbnail_image ? 
                    <img src={`${product.thumbnail_image}`}/> //refactor soon resize later
                        : <Box class="w-full aspect-square"/>}
                    <p className="font-bold">{product.name}</p>
                    <p className="text-xs text-gray-500 font-semibold">{money_format(product.price)}</p>
                </Link>
                ))
                : <div className="text-xs text-center text-gray-500 font-semibold col-span-12">No products found.</div>
            }
        </div>
    </div>
    )
}

export default Search