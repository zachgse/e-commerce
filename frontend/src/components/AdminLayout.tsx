import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"

const AdminLayout = () => {
  return (
    <>
        <ToastContainer position="top-center"
        hideProgressBar={true}
        closeOnClick={true}
        autoClose={2000}/>
        <div className="flex min-h-screen">
            <div className="w-1/5 min-h-100 text-center bg-gray-200">Admin SIDEBAR HERE</div>
            <div className="w-4/5 p-5"><Outlet/></div>
        </div>
    </>
  )
}

export default AdminLayout