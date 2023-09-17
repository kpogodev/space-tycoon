import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Views
import RootLayout from '@/views/RootLayout'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'
import DashboardView from '@/views/DashboardView'
import PrivateRoutes from './views/PrivateRoutes'
import NotFoundView from './views/NotFoundView'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route path='login' element={<LoginView />} />
                    <Route path='register' element={<RegisterView />} />
                    <Route element={<PrivateRoutes/>}>
                        <Route path='dashboard' element={<DashboardView />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFoundView />} />
            </Routes>
            <ToastContainer autoClose={5000} position='bottom-center' theme='dark'/>
        </>
    )
}

export default App
