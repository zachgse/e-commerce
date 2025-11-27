import { useEffect, useState } from "react"
import { useParams,Link } from "react-router"
import { FaBox,FaTruck,FaArrowRight,FaArrowLeft } from "react-icons/fa"
import { GiReceiveMoney } from "react-icons/gi"
import { useAppSelector } from "../../../hooks/hooks"
import { useFetchSingleUserOrder } from "../../../features/order/orderQueries"
import type { RatingProductInfo } from "../../../features/rating/ratingType"
import RatingForm from "./RatingForm"
import Box from "../../../components/reusable/Box"
import Button from "../../../components/reusable/Button"
import Modal from "../../../components/reusable/Modal"
import { money_format } from "../../../helpers/helper"
import OrderDeliveredForm from "./OrderDeliveredForm"

const OrderDetails = () => {
    const user = useAppSelector((state) => state.auth.auth); //refactor remove this since its in middleware already
    if (!user) return <div>Unauthorized</div>

    const params = useParams();
    const referenceNumber = params.reference_number;
    if (!referenceNumber) return <div>No reference number</div>

    const { data:order,isLoading,isError } = useFetchSingleUserOrder(user.token,referenceNumber);
    
    const [isCompleteOrderOpen,setIsCompleteOrderOpen] = useState<boolean>(false);
    const [isRatingFormOpen,setIsRatingFormOpen] = useState<boolean>(false);
    const [productToRate,setProductToRate] = useState<RatingProductInfo>();

    useEffect(() => {
        if (!isRatingFormOpen) setProductToRate(undefined); 
    },[isRatingFormOpen])

    const handleRate = (item?:RatingProductInfo) => {
        setIsRatingFormOpen(item ? true : false);
        setProductToRate(item ? {slug:item.slug,
                                name:item.name,
                                image:item.image,
                                quantity:item.quantity,
                                subtotal:item.subtotal}
                            :  undefined);
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error!</div>

    return (
    <>
        <Link to="/user/order">
            <FaArrowLeft className="w-6 h-6 cursor-pointer"/>
        </Link>
        <div className="flex justify-center gap-4 mb-12">
            <div className="flex flex-col items-center gap-1">
                <FaBox className="w-8 h-8"/>
                <p className="text-sm text-center font-semibold">
                    Order placed
                    <br />
                    <span className="text-xs text-gray-500">
                        {order.order_placed_at?.toLocaleString()}
                    </span>
                </p>
            </div>
            <FaArrowRight className={`my-auto w-4 h-4 ` + (order.order_shipped_at ? "text-black" : "text-gray-500 opacity-50")}/>
            <div className="flex flex-col items-center gap-1">
                <FaTruck className={`w-8 h-8 ` + (order.order_shipped_at ? "text-black" : "text-gray-500 opacity-50")}/>
                <p className={`text-sm text-center ` + (order.order_shipped_at ? "text-black  font-semibold" : "text-gray-500 opacity-50")}>
                    Shipped
                    <br />
                    <span className="text-xs text-gray-500">
                        {order.order_shipped_at?.toLocaleString()}
                    </span>
                </p>
            </div>
            <FaArrowRight className={`my-auto w-4 h-4 ` + (order.order_received_at ? "text-black" : "text-gray-500 opacity-50")}/>
            <div className="flex flex-col items-center gap-1">
                <GiReceiveMoney className={`w-8 h-8 ` + (order.order_received_at ? "text-black" : "text-gray-500 opacity-50")}/>
                <p className={`text-sm text-center ` + (order.order_received_at ? "text-black  font-semibold" : "text-gray-500 opacity-50")}>
                    Delivered
                    <br />
                    <span className="text-xs text-gray-500">
                        {order.order_received_at?.toLocaleString()}
                    </span>
                </p>
            </div>
        </div>
        <div key={order.reference_number}
            className="border border-gray-300 w-full h-auto flex flex-col gap-6 p-4">
            <p className="font-bold text-right">{order.shipping_status}</p>
            <hr className="text-gray-300"/>
            {order.items.map((item,index2) => (
            <div key={index2}
                className="flex justify-between my-2">
                {/* left side */}
                <div className="flex gap-2"> 
                    {item.image ? <img src={item.image}/> : <Box class="aspect-square w-24 h-24"/>}
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500 text-sm">x{item.quantity}</p>
                    </div>
                </div>
                {/* right side */}
                <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold">{money_format(item.subtotal)}</p>
                    {item.can_rate ? (
                        <Button onClick={() => handleRate(item)} 
                        class="mt-auto cursor-pointer hover:opacity-90 px-5 text-sm" name="Rate"/>
                    ) : (order.shipping_status.toLowerCase() == "delivered" && 
                            (<p className="text-gray-500 text-xs font-semibold">Product has been rated</p>)
                        )
                    }
                </div>
            </div>
            ))}
            <hr className="text-gray-300"/>
            <div className="flex items-center">
                {order.shipping_status.toLowerCase() == "shipped" && (
                    <Button onClick={() => setIsCompleteOrderOpen(true)} 
                        class="cursor-pointer hover:opacity-90 w-auto h-8" name="Complete order"/>
                )}
                <div className="flex flex-col ml-auto text-right">
                    <p className="text-sm text-gray-500 font-semibold">Order amount: {money_format(order?.order_amount)}</p>
                    <p className="text-sm text-gray-500 font-semibold">Shipping fee: {money_format(order?.shipping_amount)}</p>
                    <p className="text-xl font-bold mt-4">Total: {money_format(order?.total_amount)}</p>
                </div>
            </div>
        </div>
        {isCompleteOrderOpen && (
            <Modal class="md:w-1/5 w-4/5"
                isOpen={isCompleteOrderOpen}
                onCancel={() => setIsCompleteOrderOpen(false)}>
                <OrderDeliveredForm referenceNumber={order.reference_number}
                                    setIsCompleteOrderOpen={setIsCompleteOrderOpen}/>
            </Modal>
        )}
        {isRatingFormOpen && productToRate &&  (
            <Modal class="md:w-2/5 w-4/5" 
                isOpen={isRatingFormOpen}     
                onCancel={() => handleRate()}>
                <RatingForm product={productToRate}
                    referenceNumber={order.reference_number}
                    setIsRatingFormOpen={setIsRatingFormOpen}/>
            </Modal>
        )}
    </>
    )
}

export default OrderDetails