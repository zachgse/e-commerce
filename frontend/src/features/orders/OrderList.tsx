import { Link } from 'react-router'
import { useAppSelector } from '@/hooks/hooks'
import { useFetchListUserOrder } from '@/services/queries/orderQueries'
import Box from '@/components/reusable/Box'
import Button from '@/components/reusable/Button'
import { money_format } from '@/utils/helper'

const OrderList = () => {
    const user = useAppSelector((state)=>state.auth.auth)
    if (!user) return <div>Unauthenticated</div>
    const { data:orders,isLoading,isError } = useFetchListUserOrder(user.token);

    if (isLoading) return <div>Loading...</div>
    if (isError) console.log("error")

    return (
    <div className="flex flex-col gap-4">
      {orders && orders.length > 0 ? 
        orders.map((order,index) => (
          <div key={index}
              className="border border-gray-300 w-full h-auto flex flex-col gap-6 p-4">
              <p className="font-bold text-right">{order.shipping_status}</p>
              <hr className="text-gray-300"/>
              {order.items.map((item,index2) => (
                <div key={index2}
                  className="flex justify-between">
                  {/* left side */}
                  <div className="flex gap-2"> 
                    {item.image ? <img src={item.image} className='w-24 h-24'/> : <Box class='aspect-square w-24 h-24'/>}
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500 text-sm">x{item.quantity}</p>
                    </div>
                  </div>
                  {/* right side */}
                  <div className="">
                    <p className="font-semibold">{money_format(item.subtotal)}</p>
                  </div>
                </div>
              ))}
              <hr className="text-gray-300"/>
              <Link to={`${order.reference_number}`}>
                  <Button type="button" class="cursor-pointer hover:opacity-80 py-2 ml-auto" name="Order Details"/>
              </Link>
          </div>
        )) : <div>No orders yet.</div>}
    </div>
    )
}

export default OrderList