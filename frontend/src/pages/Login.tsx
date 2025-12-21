import { useState } from "react"
import { axiosClient } from "../hooks/axiosClient"
import { setUser } from "../redux/authSlice"
import { setInitialCart } from "../redux/cartSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import Button from "../components/reusable/Button"
import { fetchUserCart } from "../services/api/cartApi"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async() => {
        const formData = new FormData();
        formData.append('email',email);
        formData.append('password',password);
        const response = await axiosClient.post('/auth/login',formData);
        const token = response.data.data.token;
        const cart = await fetchUserCart(token);
        dispatch(setUser(response.data.data));
        dispatch(setInitialCart(cart ?? []));
        navigate("/");
    }
        
    return (
        <div className="h-screen grid grid-cols-3">
            <div className="hidden md:block md:col-span-2 bg-black"></div>

            <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                <div className="w-4/5 md:w-[70%] aspect-square border border-gray-300 md:border-none flex flex-col items-center justify-center gap-12">
                    <Link to="/" className="text-3xl font-bold">Ecommerce</Link>
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="font-bold" htmlFor="">Email</label>
                            <input type="text" className="w-full border border-gray-300 h-8" 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="space-y-3">
                            <label className="font-bold" htmlFor="">Password</label>
                            <input type="password" className="w-full border border-gray-300 h-8"
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="space-y-3 text-xs">
                            Doesnt have an account yet? Click <Link className="text-blue-500" to="/register">here</Link> to register
                        </div>
                        <div className="space-y-3 float-right">
                            <Button name="Login" class="px-8 py-2"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login