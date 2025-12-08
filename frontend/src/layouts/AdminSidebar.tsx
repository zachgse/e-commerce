import React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router"
import clsx from "clsx"
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import { FaChartBar } from "react-icons/fa6"
import { FaStore,FaBox,FaTruck,FaMoneyBillWave } from "react-icons/fa"

const AdminSidebar = () => {
    const mobile = window.innerWidth < 768;
    const location = useLocation();
    const [isOpen,setIsOpen] = React.useState<boolean>(mobile ? false : true);
    const [isMobile,setIsMobile] = React.useState<boolean>(mobile);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[]);

    React.useEffect(() => {
        setIsOpen(mobile ? false : true);
        setIsMobile(mobile);
    },[location.pathname])

    return (
        <div className="flex min-h-screen relative">
            {/* backdrop for mobile*/}
            {isMobile && isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-20"
                />
            )}

            {/* toggle for mobile */}
            {isMobile && (
                <div className="fixed top-4 left-4 z-40">
                    <div
                    onClick={() => setIsOpen(prev => !prev)}
                    className="w-8 h-8 bg-white rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                    >
                    {isOpen ? (
                        <MdOutlineKeyboardDoubleArrowLeft className="w-5 h-5" />
                    ) : (
                        <MdOutlineKeyboardDoubleArrowRight className="w-5 h-5" />
                    )}
                    </div>
                </div>
            )}

            {/* Sidebar wrapper */}
            <div className={clsx(
                "min-h-full text-center border-r border-gray-300 transition-all duration-200 ease-in-out",
                !isMobile && (isOpen ? "w-2/12" : "w-1/12")
            )}>
                {/* Sidebar */}
                <div className={clsx(
                    "flex flex-col transition-all duration-200 ease-in-out",
                    isMobile
                        ? "fixed top-0 left-0 h-full z-30 bg-white"
                        : "sticky top-16",
                    isMobile && (isOpen ? "w-2/5" : "w-0 overflow-hidden")
                    )}
                >

                    {/* toggler for web view */}
                    {!isMobile && (
                        <div className="absolute right-[-15px] top-[-40px] ">
                            <div onClick={() => setIsOpen(prev=>!prev)}
                                className="w-8 h-8 border border-gray-300 bg-white rounded-full 
                                            flex items-center justify-center cursor-pointer">
                            {isOpen ? (
                                <MdOutlineKeyboardDoubleArrowLeft className="w-5 h-5"/>
                            ) : (
                                <MdOutlineKeyboardDoubleArrowRight className="w-5 h-5"/>
                            )}
                            </div>
                        </div>
                    )}
                    
                    {/* sidebar items */}
                    <Link to="/" className={clsx("text-3xl font-bold mb-12",
                                            isMobile && "mt-16"
                    )}>
                        {isOpen ? (
                        "E-Commercy"
                        ) : <FaStore className="w-8 h-8 mx-auto"/>}
                    </Link>

                    <div className="border-t border-gray-300 flex justify-start
                                    w-full py-4 hover:bg-gray-100 cursor-pointer">
                        <p className={clsx("flex items-center",
                                    isOpen ? "px-10 gap-2" : "mx-auto"
                        )}>
                            <FaChartBar className="w-4 h-4"/> 
                            <span className={clsx(isOpen? "block" : "hidden")}>
                                Dashboard  
                            </span>
                        </p>
                    </div>

                    <NavLink to="/admin/products"
                        className={({ isActive }) =>
                            clsx(
                            "border-t border-gray-300 flex justify-start w-full py-4 hover:bg-gray-200 cursor-pointer",
                            isActive && "bg-gray-200 font-semibold text-blue-500"
                            )
                        }
                    >
                        <p className={clsx("flex items-center",
                                    isOpen ? "px-10 gap-2" : "mx-auto"
                        )}>
                            <FaBox className="w-4 h-4"/> 
                            <span className={clsx(isOpen? "block" : "hidden")}>
                                Products
                            </span>
                        </p>
                    </NavLink>

                    <NavLink to="/admin/orders"
                        className={({ isActive }) =>
                            clsx(
                            "border-t border-gray-300 flex justify-start w-full py-4 hover:bg-gray-200 cursor-pointer",
                            isActive && "bg-gray-200 font-semibold text-blue-500"
                            )
                        }
                    >
                        <p className={clsx("flex items-center",
                                    isOpen ? "px-10 gap-2" : "mx-auto"
                        )}>
                            <FaTruck className="w-4 h-4"/> 
                            <span className={clsx(isOpen? "block" : "hidden")}>
                                Orders
                            </span>
                        </p>
                    </NavLink>

                    <NavLink to="/admin/payments"
                        className={({ isActive }) =>
                            clsx(
                            "border-t border-b border-gray-300 flex justify-start w-full py-4 hover:bg-gray-200 cursor-pointer",
                            isActive && "bg-gray-200 font-semibold text-blue-500"
                            )
                        }
                    >
                        <p className={clsx("flex items-center",
                                    isOpen ? "px-10 gap-2" : "mx-auto"
                        )}>
                            <FaMoneyBillWave className="w-4 h-4"/> 
                            <span className={clsx(isOpen? "block" : "hidden")}>
                                Payments
                            </span>
                        </p>
                    </NavLink>

                </div>
            </div>

            {/* Main content */}
            <div className={clsx("p-5 mb-96 transition-all duration-200 ease-in-out",
                isOpen ? "w-10/12" : "w-11/12",
                isMobile && "w-full")}>
                <Outlet/>
            </div>

        </div>
    )
}

export default AdminSidebar