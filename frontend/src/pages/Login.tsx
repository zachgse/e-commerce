import React, { useState } from "react"
import { axiosClient } from "../hooks/axiosClient"
import { setUser } from "../redux/authSlice"
import { setInitialCart } from "../redux/cartSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import Button from "../components/reusable/Button"
import { fetchUserCart } from "../services/api/cartApi"
import Loading from "@/components/reusable/Loading"
import clsx from "clsx"

type Status = "loading" | "success" | "error" | undefined

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [status,setStatus] = React.useState<Status>();
    const emailRef = React.useRef<HTMLInputElement|null>(null);

    const handleSubmit = async(e: React.FormEvent) => {   
        e.preventDefault();
        try {
            setStatus("loading");
            await new Promise((r) => setTimeout(r,1000));
            setTimeout(() => {},2000)
            const formData = new FormData();
            formData.append('email',email);
            formData.append('password',password);
            const response = await axiosClient.post('/auth/login',formData);
            setStatus("success");
            await new Promise((r) => setTimeout(r,1000));
            dispatch(setUser(response.data.data));
            if (!response.data.data.user.email_verified) {
                navigate("/verify");
            } else {
                const cart = await fetchUserCart(response.data.data.token);
                dispatch(setInitialCart(cart ?? []));
                navigate("/");
            }
        } catch (error) {
            setEmail("");
            setPassword("");
            setStatus("error");
            emailRef?.current?.focus();
        }

    }
        
    return (
        <div className="h-screen grid grid-cols-3">
            <div className="hidden md:block md:col-span-2 bg-black"></div>

            <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                <div className="w-4/5 md:w-[70%] aspect-square border border-gray-300 md:border-none flex flex-col items-center justify-center gap-12">
                    <Link to="/" className="text-3xl font-bold">Ecommerce</Link>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="font-bold" htmlFor="">Email</label>
                            <input type="text" className={clsx('w-full border border-gray-300 h-8 p-2',
                                                        status == "error" && "border-2 border-red-500 focus:outline-red-500"
                            )} 
                            value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef}/>
                        </div>
                        <div className="space-y-3">
                            <label className="font-bold" htmlFor="">Password</label>
                            <input type="password" className={clsx('w-full border border-gray-300 h-8 p-2',
                                                        status == "error" && "border-2 border-red-500 focus:outline-red-500"
                            )}
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {status == "error" && (
                            <div className="space-y-3">
                                <p className="text-red-500">Incorrect credentials.</p>
                            </div>
                        )}
                        
                        <div className="space-y-3 text-xs">
                            Doesnt have an account yet? Click <Link className="text-blue-500" to="/register">here</Link> to register
                        </div>
                        <div className="space-y-3 float-right">
                            <Button type="submit" name="Login" class="px-8 py-2"/>
                        </div>
                    </form>
                </div>
            </div>

            {(status == "loading" || status == "success") && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
                    <div className="fixed inset-0 flex justify-center items-center z-20">
                        <div className={`bg-white p-6 flex justify-center items-center w-72 h-28`}>
                            {status == "loading" && <Loading/>}
                            {status == "success" && <p>Login successful. Redirecting</p>}
                        </div>
                    </div>  
                </>
            )}
        </div>
    )
}

export default Login