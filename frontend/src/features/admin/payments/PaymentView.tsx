import { useFetchPaymentDetails } from "@/services/queries/adminQueries"

type PaymentViewProps = {
    referenceNumber: string
}

const PaymentView = (props:PaymentViewProps) => {
    const { data,isLoading } = useFetchPaymentDetails(props.referenceNumber);
    if (isLoading) return <div>Loading...</div> //refactor soon

    return (
        <div className="flex flex-col gap-4">
            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Reference Number</label>
                <p className="flex-1 break-words">{props.referenceNumber}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Payment intent ID</label>
                <p className="flex-1 break-words">{data?.payment_intent_id}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Client key ID</label>
                <p className="flex-1 break-words">{data?.client_key_id}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Amount</label>
                <p className="flex-1 break-words">{data?.order_amount}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Status</label>
                <p className="flex-1 break-words">{data?.status}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Payment created at</label>
                <p className="flex-1 break-words">{data?.created_at.toLocaleString()}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Payment updated at</label>
                <p className="flex-1 break-words">
                    {data?.updated_at ? data.updated_at.toLocaleString() : "---"}
                </p>
            </div>
        </div>
    )
}

export default PaymentView