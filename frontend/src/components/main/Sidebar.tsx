import React, { type SetStateAction } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router'

type SidebarProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({isOpen,setIsOpen}:SidebarProps) => {
    if (!isOpen) return null
    return (
        <>
            <div onClick={()=>setIsOpen(false)} className="fixed inset-0 bg-black/50 z-20"></div>
            <div className="fixed w-[50%] h-full bg-white top-0 right-0 z-30 flex flex-col items-center gap-12 px-12 py-20">
                <IoMdClose onClick={() => setIsOpen(false)} className="absolute top-8 right-6 cursor-pointer"/>
                <Link to="/" className="md:text-3xl text-xl uppercase font-bold tracking-wider">E-commerce</Link>
                <div className="flex flex-col items-center justify-center gap-4"> 
                    <Link to="/order" className="cursor-pointer">Orders</Link>
                    <div className="cursor-pointer">Logout</div>
                </div>
            </div>
        </>
    )
}

export default Sidebar