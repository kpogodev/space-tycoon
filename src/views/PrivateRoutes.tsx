import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { selectIsAuthenticated } from '@/features/auth/authSlice'

const PrivateRoutes = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const location = useLocation()

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' state={{ from: location.pathname }} replace />
}

export default PrivateRoutes
