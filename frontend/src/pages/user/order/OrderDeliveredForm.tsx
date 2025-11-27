import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateOrderStatus } from '../../../features/order/orderQueries'
import ModalLoading from '../../../components/reusable/ModalLoading'
import Button from '../../../components/reusable/Button'

type OrderDeliveredFormProps = {
    referenceNumber:string
    setIsCompleteOrderOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const OrderDeliveredForm = (props:OrderDeliveredFormProps) => {
    const queryClient = useQueryClient();
    const { mutateAsync } = useUpdateOrderStatus();
    const [isLoading,setIsLoading] = useState<boolean>(false);

    if (!props.referenceNumber) return null;

    const handleCompleteOrder = async() => {
        setIsLoading(true);
        try {
            await mutateAsync(props.referenceNumber);
            await queryClient.invalidateQueries({
                queryKey: ["order",props.referenceNumber]
            });
            setIsLoading(false);
            props.setIsCompleteOrderOpen(false);
            toast.success("Order has been completed");
        } catch (error) {
            console.log("error is: ", error);
            toast.error("Error! Order not completed");
        } 
    }

    return (
        <>
            <div className="flex flex-col gap-6 text-center">
                <p className='font-semibold text-lg'>Complete the order?</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button onClick={() => handleCompleteOrder()} 
                        name="Complete" class='cursor-pointer hover:opacity-90 py-2 px-6'/>
                    <Button onClick={() => props.setIsCompleteOrderOpen(false)} 
                        name="Cancel" class='cursor-pointer bg-red-500 hover:opacity-90 py-2 px-6'/>
                </div>
            </div>
            {isLoading && (<ModalLoading isOpen={true}/>)}
        </>
    )
}

export default OrderDeliveredForm