import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { checkAuth } from './features/auth/authSlice.ts'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

if (!store.getState().auth.isAuthenticated) {
    store.dispatch(checkAuth())
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
)
