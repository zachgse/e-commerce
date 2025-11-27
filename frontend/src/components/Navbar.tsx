import { Link } from "react-router"
import { useAppDispatch,useAppSelector } from "../hooks/hooks"
import { removeUser } from "../redux/authSlice"
import { setInitialCart } from "../redux/cartSlice"
import { axiosClient } from "../api/axiosClient"
import { AiOutlineShoppingCart } from "react-icons/ai"
import Searchbar from "./Searchbar"

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.auth);
  const cart = useAppSelector((state) => state.cart.cart);
  
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
    <div className="w-full border-b border-gray-300 rounded flex justify-between items-center px-12 py-6 gap-4">
      <div>
        <Link to="/" className="text-3xl uppercase font-bold tracking-wider me-auto">E-commerce</Link>
      </div>
      <div><Searchbar/></div>
      <div>
      {user
        ? (
            <div className="flex gap-4">
              <Link to="/user/order" className="cursor-pointer">Orders</Link>
              <Link to="cart" className="relative inline-block">
                <AiOutlineShoppingCart className="w-7 h-7 text-gray-800" />
                <div className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-black text-white text-xs font-semibold rounded-full">
                  {cart && cart.length > 0 ? cart.length : 0}
                </div>
              </Link>
              <div onClick={handleLogout} className="cursor-pointer">Logout</div>
            </div>
          )
        : (
            <Link to="login">Login</Link>
          )
      }
      </div>
    </div>
  )

}

export default Navbar