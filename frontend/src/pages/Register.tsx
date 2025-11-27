import { Link } from "react-router"
import Button from "../components/reusable/Button"

const Register = () => {
  return (
    <div className="h-screen grid grid-cols-3">
        <div className="col-span-3 md:col-span-1 flex items-center justify-center">
            <div className="w-4/5 md:w-[70%] aspect-square border border-gray-300 md:border-none flex flex-col items-center justify-center gap-12">
                <Link to="/" className="text-3xl font-bold">Ecommerce</Link>
                <form action="" className="space-y-6">
                    <div className="space-y-3">
                        <label className="font-bold" htmlFor="">Email</label>
                        <input type="text" className="w-full border border-gray-300 h-8"/>
                    </div>
                    <div className="space-y-3">
                        <label className="font-bold" htmlFor="">Password</label>
                        <input type="text" className="w-full border border-gray-300 h-8"/>
                    </div>
                    <div className="space-y-3 text-xs">
                        Already have an account? Click <Link className="text-blue-500" to="/login">here</Link> to login
                    </div>
                    <div className="space-y-3 float-right">
                        <Button name="Register" class="px-8 py-2"/>
                    </div>
                </form>
            </div>
        </div>
        <div className="hidden md:block md:col-span-2 bg-black"></div>
    </div>
  )
}

export default Register