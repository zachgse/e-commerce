import { Outlet, useLocation } from "react-router"
import { ToastContainer } from "react-toastify"
import Navbar from "./Navbar"
import 'react-toastify/dist/ReactToastify.css'
import clsx from "clsx"

const MainLayout = () => {
  const location = useLocation();
  
  return (
    <>
      <Navbar/>
      <ToastContainer position="top-center"
        hideProgressBar={true}
        closeOnClick={true}
        autoClose={2000}/>
      <div className={clsx(location.pathname != "/cart" && "md:px-20 px-8 my-8")}>
        <Outlet/>
      </div>
    </>
  )
}

export default MainLayout