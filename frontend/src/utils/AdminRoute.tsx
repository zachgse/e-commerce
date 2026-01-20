import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from '@/hooks/hooks'

const AdminRoute = () => {
    const user = useAppSelector((state) => state.auth.auth);
    if (user?.user.type != "admin") {
        return <Navigate to="/"/>
    }
    return <Outlet/>
}

export default AdminRoute