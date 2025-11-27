import { IoIosWarning } from "react-icons/io"
import { Link } from "react-router"

type Props = {
    message : string;
}

const ErrorComponent = (props:Props) => {
  return (
    <div className='min-h-100 flex flex-col items-center justify-center'>
        <IoIosWarning className="w-18 h-18 text-black mb-4"/>
        <p className="font-semibold mb-2">{props.message}</p>
        <Link to="/" className="text-blue-500 text-xs">
          Back to home
        </Link>
    </div>
  )
}

export default ErrorComponent