import { Outlet,Navigate } from 'react-router'
import { useAppSelector } from '@/hooks/hooks'

const GuestRoute = () => {
    const user = useAppSelector((state) => state.auth.auth?.user);
    return user ? <Navigate to="/"/> : <Outlet/>
}

export default GuestRoute