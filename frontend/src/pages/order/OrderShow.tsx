import OrderDetails from '@/features/orders/OrderDetails'
import { useParams } from 'react-router'

const OrderShow = () => {
    const params = useParams();
    const referenceNumber = params.reference_number;
    if (!referenceNumber) return <div className='text-center'>No reference number</div>

    return (
        <OrderDetails referenceNumber={referenceNumber}/>
    )
}

export default OrderShow