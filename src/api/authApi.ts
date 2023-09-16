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

export default {
    check: (): CheckResponseType => axiosInstanceInternal.post('/auth/check'),
    register: (payload: RegisterInputs): RegisterResponseType => axiosInstanceInternal.post('/auth/register', payload),
    login: (payload: LoginInputs): LoginResponseType => axiosInstanceInternal.post('/auth/login', payload),
    logout: (): LogoutResponseType => axiosInstanceInternal.post('/auth/logout'),
}
