import { ToastContainer } from "react-toastify"
import AdminSidebar from "../components/admin/AdminSidebar"

const AdminLayout = () => {
  return (
    <>
        <ToastContainer position="top-center"
          hideProgressBar={true}
          closeOnClick={true}
          autoClose={2000}/>
        <AdminSidebar/>
    </>
  )
}

export default AdminLayout