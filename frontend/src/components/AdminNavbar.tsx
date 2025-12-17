import { date_format } from "@/utils/helper"
import { FaCalendar } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"

const AdminNavbar = () => {
    return (
        <div className='w-full py-4 border-b border-gray-300 px-5
                        flex'>
            <div className="flex items-center gap-2 font-bold me-auto">
                <FaCalendar/>
                {date_format(new Date)}
            </div>
            <IoLogOut className="w-6 h-6 text-red-500 cursor-pointer"/>
        </div>
    )
}

export default AdminNavbar