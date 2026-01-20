import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from '@/hooks/hooks'

const EmailVerifiedRoute = () => {
    const user = useAppSelector((state) => state.auth.auth?.user);
    if (!user?.email_verified) {
        return <Navigate to="/verify"/>
    }

    return <Outlet/>
}

export default EmailVerifiedRoute