import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@/components/ThemeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { checkAuth } from './features/authSlice.ts'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

if (!store.getState().auth.isAuthenticated) {
    store.dispatch(checkAuth())
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider defaultTheme='dark' storageKey='app-ui-theme'>
                <Router>
                    <App />
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)
