import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider.tsx'
import { store, persistor } from '@/app/store'
import { checkAuth } from '@/features/authSlice.ts'
import './index.css'

if (!store.getState().auth.isAuthenticated) {
    store.dispatch(checkAuth())
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <ThemeProvider defaultTheme='dark' storageKey='app-ui-theme'>
                    <Router>
                        <App />
                    </Router>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
