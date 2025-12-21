import { useSearchParams } from 'react-router'
import { useFetchFullSearchProducts } from '../services/queries/productQueries'
import { FaRegLightbulb } from "react-icons/fa"
import ProductListData from '../features/products/list/ProductListData'
import Loading from '@/components/reusable/Loading'

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
    
    if (isLoading) return <Loading/>

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

    return (
        <div className="flex flex-col gap-8">
            <div className='flex items-center gap-2 text-lg'>
                <FaRegLightbulb className='w-4 h-4'/>
                Search results for: <span className='font-bold'>"{keyword}"</span>
            </div>
            <div className="w-full bg-gray-100 h-16 flex items-center gap-4 px-6">
                Sort by
                <div
                onClick={() => setParam("sortBy", "asc")}
                className={`w-auto h-auto cursor-pointer px-4 ${
                    sortByParam === 'asc' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
                >
                Low to High
                </div>

                <div
                onClick={() => setParam("sortBy", "desc")}
                className={`w-auto h-auto cursor-pointer px-4 ${
                    sortByParam === 'desc' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
                >
                High to Low
                </div>
                <div onClick={() => setParam("sortBy", null)} 
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
            <ProductListData products={searchedProducts}/>
        </div>
    )
}

export default Search