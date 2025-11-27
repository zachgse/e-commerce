import { Outlet } from "react-router"

const ProfileLayout = () => {
  return (
    <div className="flex gap-4">
        <div className="w-1/5 min-h-100 text-center bg-gray-200">SIDEBAR HERE</div>
        <div className="w-4/5 "><Outlet/></div>
    </div>
  )
}

export default ProfileLayout