import { axiosInstanceInternal } from '@/config/axiosConfig'
import { AxiosResponse } from 'axios'
import type { LoginInputs, RegisterInputs, AuthResponseData } from '@/types/auth'


type ResponseData<T> = {
    success: boolean
    data: T
}
type ResponseType<T> = Promise<AxiosResponse<ResponseData<T>>>

type CheckResponseType = ResponseType<undefined>
type RegisterResponseType = ResponseType<AuthResponseData>
type LoginResponseType = ResponseType<AuthResponseData>
type LogoutResponseType = ResponseType<undefined>

const requestUrl = {
    check: '/auth/check',
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
}

export default {
    check: (): CheckResponseType => axiosInstanceInternal.post(requestUrl.check),
    register: (payload: RegisterInputs): RegisterResponseType => axiosInstanceInternal.post(requestUrl.register, payload),
    login: (payload: LoginInputs): LoginResponseType => axiosInstanceInternal.post(requestUrl.login, payload),
    logout: (): LogoutResponseType => axiosInstanceInternal.post(requestUrl.logout),
}
