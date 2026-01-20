import React from "react"
import { useNavigate } from "react-router"
import clsx from "clsx"
import { Oval } from "react-loader-spinner"
import { useFetchNewOtp, useFetchValidateOtp } from "@/services/queries/authQueries"
import { otpMessage } from "@/utils/styleHelper"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { verifyEmail } from "@/redux/authSlice"

type Status = "success" | "resent" | "failed" | undefined

const Verification = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.auth?.user);
  if (user?.email_verified){
    navigate("/"); 
  }
  const LENGTH = 6;
  const resendOtp = useFetchNewOtp();
  const validateOtp = useFetchValidateOtp();
  const [isLoading,setIsLoading] = React.useState<boolean>(false);
  const [isResending,setIsResending] = React.useState<boolean>(false);
  const [status,setStatus] = React.useState<Status>(undefined);
  const [otp,setOtp] = React.useState(Array(LENGTH).fill(""));
  const inputRef = React.useRef<(HTMLInputElement|null)[]>([]);

  const handleChange = (value: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = value.toUpperCase();
      setOtp(newOtp);
      if (value && (index < LENGTH - 1)) {
          inputRef.current[index + 1]?.focus();
      } 
  };

  const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
  ) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
          inputRef.current[index - 1]?.focus();
      }
  };

  const handleResend = async() => {
    setIsLoading(true);
    setIsResending(true);
    setStatus("resent");
    await resendOtp.mutateAsync();
    setIsLoading(false);
    setIsResending(false);
  }

  React.useEffect(() => {
      inputRef.current[0]?.focus();
  },[])

  React.useEffect(() => {
    const handleValidateOtp = async() => {
      try {
        setStatus(undefined);
        setIsLoading(true);
        const finalOtp = otp.join("");
        const response = await validateOtp.mutateAsync({otp:finalOtp});
        setStatus(response == true ? "success" : "failed");
        dispatch(verifyEmail(response));
        //check if success sync cart
        setIsLoading(false);
        setTimeout(() => {
          navigate("/");
        },2000)
      } catch (error) {
        setStatus("failed");
      }
    }

    if (!otp.includes("")){
      handleValidateOtp();
    } else {
      setStatus(undefined);
    }
  },[otp])

  return (
  <div className="flex flex-col items-center justify-center gap-2 mt-20">
    {isLoading && !isResending && (
      <Oval
        height={32}
        width={32}
        color="black"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="black"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    )}
    {isLoading == false && status != undefined && (
      <div className={otpMessage(status)}>
        {status == "resent" && "New OTP has been sent to your email."}
        {status == "success" && "OTP has been verified. Redirecting..."}
        {status == "failed" && "Incorrect OTP."}
      </div>
    )}
    <p className="font-bold text-lg text-center">Please check your email for <br/> One-Time-PIN (OTP) Verification</p>
    {isResending == true ? (
      <Oval
        height={32}
        width={32}
        color="black"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="black"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    ) : (
      <p className="text-sm">Click <span className="text-blue-500 underline cursor-pointer" onClick={handleResend}>here</span> to resend OTP</p>
    )}
    <div className="flex items-center justify-center gap-2 mt-8">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            if (inputRef.current) {
                inputRef.current[index] = el
            }}}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={clsx(
            "w-10 h-10 text-center border rounded",
            status === "failed" && ("border-red-500 focus:outline-red-400"),
            status === "success" && ("border-green-500 focus:outline-green-500")
          )}
          readOnly={isLoading}
        />
      ))}
    </div>
  </div>
  )
}

export default Verification