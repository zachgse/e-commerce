import type { TransactionStats } from '@/types/adminTypes';
import { money_format } from '@/utils/helper'

type TransactionStatsProps = {
  data?: TransactionStats
}

const PaymentStats = ({data}:TransactionStatsProps) => {

  return (
    <div className="flex flex-col gap-2">
      <p className='font-bold'>Latest transactions</p>
      <table className="w-full table-fixed">
          <thead>
            <tr className='border-b border-gray-300 font-semibold'>
              <td className='pl-6 py-2'>Reference #</td>
              <td className='pl-6 py-2'>Amount</td>
              <td className='pl-6 py-2'>Date</td>
            </tr>
          </thead>
          <tbody>
              {data?.map((d,index:number) => (
              <tr key={index}>
                  <td className="border-r border-gray-300 pl-6 py-4">
                    <span className="font-semibold">{d.reference_number}</span>
                  </td>
                  <td className="border-r border-gray-300 pl-6 py-4">
                    <span className="text-green-500 font-semibold">+ {money_format(d.order_amount)}</span>
                  </td>
                  <td className="pl-6">
                      {d.created_at.toLocaleString()}
                  </td>
              </tr>
              ))}
          </tbody>
      </table>
    </div>
  )
}

export default PaymentStats