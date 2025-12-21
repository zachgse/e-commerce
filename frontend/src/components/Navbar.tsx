import { Link } from "react-router"
import { useAppDispatch,useAppSelector } from "@/hooks/hooks"
import { removeUser } from "@/redux/authSlice"
import { setInitialCart } from "@/redux/cartSlice"
import { axiosClient } from "@/api/axiosClient"
import { AiOutlineShoppingCart } from "react-icons/ai"
import Searchbar from "./Searchbar"
import { GiHamburgerMenu } from "react-icons/gi"
import Sidebar from "./Sidebar"
import React from "react"
import { FaStore } from "react-icons/fa"

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.auth);
  const cart = useAppSelector((state) => state.cart.cart);
  
  const [isMobile,setIsMobile] = React.useState<boolean>(window.innerWidth < 768);
  const [isOpen,setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);
      setIsOpen(prev => (mobile ? prev : false));
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  async function handleLogout() {
    await axiosClient.post("/auth/logout",{}, {
      headers: {
        "Authorization": `Bearer ${user?.token}`
      }
    })
    dispatch(removeUser());
    dispatch(setInitialCart([]));
  }

  return (
    <>
    <div className="w-full border-b border-gray-300 rounded flex justify-between items-center md:px-12 px-6 py-6 gap-4">
      <div>
        <Link to="/" className="text-3xl uppercase font-bold tracking-wider me-auto">
          {isMobile ? (
            <FaStore className="w-8 h-8 mx-auto"/>
          ) : "E-commercy"}
        </Link>
      </div>
      <div className=""><Searchbar/></div>
      <div className="relative">
      {user
        ? (
          <>
            {isMobile ? (
              <div className="flex gap-4">
                <Link to="cart" className="relative inline-block">
                  <AiOutlineShoppingCart className="w-7 h-7 text-gray-800" />
                  <div className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-black text-white text-xs font-semibold rounded-full">
                    {cart && cart.length > 0 ? cart.length : 0}
                  </div>
                </Link>
                <GiHamburgerMenu onClick={() => setIsOpen(true)} className="md:hidden block relative cursor-pointer w-6 h-6"/>
              </div>
            ) : (
              <div className="gap-4 md:flex hidden">
                <Link to="/admin" className="cursor-pointer">Admin</Link>
                <Link to="/order" className="cursor-pointer">Orders</Link>
                <Link to="cart" className="relative inline-block">
                  <AiOutlineShoppingCart className="w-7 h-7 text-gray-800" />
                  <div className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-black text-white text-xs font-semibold rounded-full">
                    {cart && cart.length > 0 ? cart.length : 0}
                  </div>
                </Link>
                <div onClick={handleLogout} className="cursor-pointer">Logout</div>
              </div>
            )}            
          </>
          )
        : (
            <Link to="login">Login</Link>
          )
      }
      </div>
    </div>
    {isMobile && (
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
    )}
    
    </>

  )

}

export default Navbar