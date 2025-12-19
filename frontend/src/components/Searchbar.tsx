import React,{ useRef, useState } from "react"
import { useNavigate,useLocation } from "react-router"
import { useFetchKeywordSearchProducts } from "@/services/queries/productQueries"
import { FaSearch } from "react-icons/fa"

const Searchbar = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const searchContainerRef = useRef<HTMLDivElement>(null); 
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query,setQuery] = useState<string>("");
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const { data:searchedProducts=[],isLoading} = useFetchKeywordSearchProducts(query);

  const handleSearch = () => {
    navigate(`/search?keyword=${query}`);
  }

  React.useEffect(() => { //use effect for href 
    if (location.pathname != "/search") setQuery("");    
  },[location.pathname]);

  React.useEffect(() => { //use effect for clicking outside the search ref container
    const handleClickOutside = (e:MouseEvent) => {
      if (searchContainerRef && !searchContainerRef?.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => {
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[]);

  React.useEffect(() => { //use effect for hitting enter inside input search ref
    const searchInputRefListener = searchInputRef.current;
    if (!searchInputRefListener) return;

    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === "Enter"){
        handleSearch();
      }
    }

    searchInputRefListener.addEventListener("keydown",handleKeyDown);

    return () => {
      searchInputRefListener.removeEventListener("keydown",handleKeyDown);
    }
  },[query]);

  return (
    <div ref={searchContainerRef} className="relative">
      <div className="relative">
        <input ref={searchInputRef} 
          onClick={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className="lg:w-96 min-w-full h-8 border border-gray-300 px-2"
        />
        <div onClick={handleSearch}
          className="absolute right-2 top-2">
          <FaSearch  
            className="w-4 h-4 cursor-pointer"/> 
        </div>
      </div>

      {query.length > 0 && !isLoading && isOpen && (
        <div className="absolute top-8 lg:w-96 min-w-full h-auto border border-gray-300 
                        bg-white z-50 flex flex-col p-1">
        {searchedProducts?.length > 0 ?
           searchedProducts.map((product,index:number) => (
            <div key={index} 
              className="flex items-center w-full hover:bg-gray-100 cursor-pointer px-4 py-2">
              <p className="">{product.name}</p>
            </div>
           )) : 
              (query.length > 1 && <div className="px-4 py-2 text-center">No products found</div>)
        }
        </div>
      )}
    </div>
  );
};

export default Searchbar;
