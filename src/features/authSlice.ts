import { createSlice, createAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { LoginInputs, RegisterInputs, AuthResponseData } from '@/types/auth'

interface AuthState {
    email: string
    nick: string
    isAuthenticated: boolean
    isLoading: boolean
}

const initialState: AuthState = {
    email: '',
    nick: '',
    isAuthenticated: false,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkAuthSuccess: (state) => {
            state.isAuthenticated = true
            state.isLoading = false
        },
        checkAuthFailure: (state) => {
            state.isAuthenticated = false
            state.isLoading = false
        },
        loginAuthSuccess: (state, action: PayloadAction<Omit<AuthResponseData, 'id'>>) => {
            state.email = action.payload.email
            state.nick = action.payload.nick
            state.isAuthenticated = true
            state.isLoading = false
        },
        loginAuthFailure: (state) => {
            state.isAuthenticated = false
            state.isLoading = false
        },
        registerAuthSuccess: (state, action: PayloadAction<Omit<AuthResponseData, 'id'>>) => {
            state.email = action.payload.email
            state.nick = action.payload.nick
            state.isAuthenticated = true
            state.isLoading = false
        },
        registerAuthFailure: (state) => {
            state.isAuthenticated = false
            state.isLoading = false
        },
        logoutAuthSuccess: (state) => {
            state.email = ''
            state.nick = ''
            state.isAuthenticated = false
            state.isLoading = false
        },
        logoutAuthFailure: (state) => {
            state.isLoading = false
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

// Automatically generated action creators
export const {
    checkAuthSuccess,
    checkAuthFailure,
    loginAuthSuccess,
    loginAuthFailure,
    registerAuthSuccess,
    registerAuthFailure,
    logoutAuthSuccess,
    logoutAuthFailure,
    setIsLoading,
} = authSlice.actions

// Manually set action creators
export const loginAuth = createAction('auth/loginAuth', ({ email, password }: LoginInputs) => ({
    payload: { email, password },
}))
export const registerAuth = createAction('auth/registerAuth', ({ email, password, nick }: RegisterInputs) => ({
    payload: { email, password, nick },
}))
export const checkAuth = createAction('auth/checkAuth')
export const logoutAuth = createAction('auth/logoutAuth')

// Simple selectors
export const selectAuth = (state: RootState) => state.auth
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectIsLoading = (state: RootState) => state.auth.isLoading

export default authSlice.reducer
