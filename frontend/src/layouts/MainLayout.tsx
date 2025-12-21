import { Outlet, useLocation } from "react-router"
import { ToastContainer } from "react-toastify"
import Navbar from "../components/main/Navbar"
import 'react-toastify/dist/ReactToastify.css'
import clsx from "clsx"

const MainLayout = () => {
  const PATHS = ['/cart','/checkout'];
  const location = useLocation();
  
  return (
    <>
      <Navbar/>
      <ToastContainer position="top-center"
        hideProgressBar={true}
        closeOnClick={true}
        autoClose={2000}/>
      <div className={clsx(!PATHS.includes(location.pathname) && "md:px-20 px-8 my-8")}>
        <Outlet/>
      </div>
    </>
  )
}

export default MainLayout