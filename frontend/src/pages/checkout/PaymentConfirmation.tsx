import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useFetchPaymentSession } from "../../features/payment/paymentQueries"
import { echo } from "../../lib/echo"
import type { PaymentStatus } from "../../features/payment/paymentType"
import { Oval } from 'react-loader-spinner'
import { FaCheckCircle } from "react-icons/fa"
import { TiDelete } from "react-icons/ti"
import PaymentConfirmationSkeleton from "./PaymentConfirmationSkeleton"
import ErrorComponent from "../../components/reusable/ErrorComponent"

type PaymentEvent = {
  status: PaymentStatus;
};

function Message({ status }: PaymentEvent) {
  if (status === "success") {
    return (
      <>
        <FaCheckCircle className="w-12 h-12 text-green-500" />
        <p className="text-2xl font-bold">Payment confirmed</p>
      </>
    );
  } else if (status === "failed") {
    return (
      <>
        <TiDelete className="w-17 h-17 text-red-500" />
        <p className="text-2xl font-bold">Payment failed</p>
      </>
    );
  } else {
    return (
      <>
        <Oval
          height={48}
          width={48}
          color="black"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="black"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <p className="text-2xl font-bold">Awaiting payment</p>
      </>
    );
  }
}

const PaymentConfirmation = () => {
  const { reference_number } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const {
    data: payment,
    isLoading,
    isError,
    error,
  } = useFetchPaymentSession(reference_number ?? "");

  useEffect(() => {
    if (!reference_number) return;

    echo
      .channel(`payment.${reference_number}`)
      .listen("payment_notification", (e: PaymentEvent) => {
        console.log("Received payment event:", e);

        queryClient.setQueryData(
          ["paymentSession", reference_number],
          (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              status: e.status,
            };
          }
        );
      });

    return () => {
      echo.leaveChannel(`payment.${reference_number}`);
    };
  }, [reference_number, queryClient]);

  useEffect(() => {
    if (!payment) return;

    if (payment.status === "success" || payment.status === "failed" || payment.is_payment_session_expired) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [payment]);

  useEffect(() => {
    if ((payment?.status === "success" || payment?.status === "failed" || payment?.is_payment_session_expired) && countdown === 0) {
      navigate("/");
    }
  }, [countdown, payment, navigate]);

  if (!reference_number) return <ErrorComponent message="No reference number found"/>;
  if (isLoading) return <PaymentConfirmationSkeleton/>;
  if (isError) {
    console.log("error in error block is: ",error.response.data.msg);
    return <ErrorComponent message={error.response.data.msg}/>;
  }
  if (!payment) return <ErrorComponent message="No payment found"/>;
  
  if (payment.is_payment_session_expired) {
    return (
      <div className="flex flex-col items-center gap-2 mt-24">
        <TiDelete className="w-17 h-17 text-red-500" />
        <p className="text-2xl font-bold">Payment session has expired</p>
        <p className="text-md font-semibold">Order # {reference_number}</p>
        {(payment.status === "success" || payment.status === "failed" || payment.is_payment_session_expired) && (
          <p className="text-blue-500 text-sm font-semibold">
            Redirecting in ({countdown}) second{countdown > 1 ? "s" : ""}
          </p>
        )}
      </div>
    )
  } 

  return (
    <div className="flex flex-col items-center gap-2 mt-24">
      <Message status={payment.status} />
      <p className="text-md font-semibold">Order # {reference_number}</p>
      {(payment.status === "success" || payment.status === "failed" || payment.is_payment_session_expired) && (
        <p className="text-blue-500 text-sm font-semibold">
          Redirecting in ({countdown}) second{countdown > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default PaymentConfirmation;
