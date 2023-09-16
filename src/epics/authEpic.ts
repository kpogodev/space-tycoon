import { toast } from 'react-toastify'
import { combineEpics, ofType } from 'redux-observable'
import { from, mergeMap, catchError, startWith, endWith } from 'rxjs'
import { axiosErrorHandler } from '@/utils/axiosErrorHandler'
import authApi from '@/api/authApi'
import {
    checkAuth,
    checkAuthSuccess,
    registerAuth,
    registerAuthSuccess,
    registerAuthFailure,
    loginAuth,
    loginAuthSuccess,
    loginAuthFailure,
    checkAuthFailure,
    setIsLoading,
    logoutAuth,
    logoutAuthSuccess,
    logoutAuthFailure,
} from '@/features/auth/authSlice'
import type { Observable } from 'rxjs'

type ActionsType = Observable<any>
type Epic = (action$: ActionsType) => Observable<any>

const registerEpic: Epic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(registerAuth.type),
        mergeMap((action: ReturnType<typeof registerAuth>) => {
            return from(authApi.register(action.payload)).pipe(
                mergeMap((res) => {
                    toast.success(`Welcome ${res.data.data.nick}, you have successfully registered!`)
                    return [registerAuthSuccess(res.data.data)]
                }),
                catchError((err) => {
                    axiosErrorHandler(err)
                    return [registerAuthFailure()]
                })
            )
        }),
        startWith(() => [setIsLoading(true)]),
        endWith(() => [setIsLoading(false)])
    )
}

const loginEpic: Epic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(loginAuth.type),
        mergeMap((action: ReturnType<typeof loginAuth>) => {
            return from(authApi.login(action.payload)).pipe(
                mergeMap((res) => {
                    toast.success(`Welcome ${res.data.data.nick}, you have successfully logged in!`)
                    return [loginAuthSuccess(res.data.data)]
                }),
                catchError((err) => {
                    axiosErrorHandler(err)
                    return [loginAuthFailure()]
                })
            )
        }),
        startWith(() => [setIsLoading(true)]),
        endWith(() => [setIsLoading(false)])
    )
}

const checkAuthEpic: Epic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(checkAuth.type),
        mergeMap(() => {
            return from(authApi.check()).pipe(
                mergeMap(() => [checkAuthSuccess()]),
                catchError(() => {
                    return [checkAuthFailure()]
                })
            )
        })
    )
}

const logoutEpic: Epic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(logoutAuth.type),
        mergeMap(() => {
            return from(authApi.logout()).pipe(
                mergeMap(() => [logoutAuthSuccess()]),
                catchError((err) => {
                    axiosErrorHandler(err)
                    return [logoutAuthFailure()]
                })
            )
        })
    )
}

export default combineEpics(registerEpic, loginEpic, checkAuthEpic, logoutEpic)
