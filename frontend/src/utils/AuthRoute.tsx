import { Outlet,Navigate } from 'react-router'
import { useAppSelector } from '@/hooks/hooks'

const AuthRoute = () => {
    const user = useAppSelector((state) => state.auth.auth?.user);
    return user ? <Outlet/> : <Navigate to="/login"/>
}  

export default AuthRoute