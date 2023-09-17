import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

const dontRedirect = ['/login', '/register']

const RootLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated && !dontRedirect.includes(location.pathname)) return <Navigate to='/login' />;
  return (
    <div className='min-h-screen w-full bg-background text-foreground'>
      <Outlet />
    </div>
  );

}

export default RootLayout