import { axiosInstanceInternal } from '@/config/axiosConfig'
import { AxiosResponse } from 'axios'
import type { AgentResponseData, CreateAgentInputs } from '@/types/account'


type ResponseData<T> = {
    success: boolean
    data: T
}
type ResponseType<T> = Promise<AxiosResponse<ResponseData<T>>>

type AgentsResponseData = Pick<AgentResponseData, 'id'| 'symbol' | 'faction'>

type GetAgentsResponseType = ResponseType<AgentsResponseData[]>
type CreateAgentResponseType = ResponseType<AgentResponseData>


const requestUrl = {
    getAgentsList: '/agent/list',
    getSelectedAgent: (id: string | number) => `/agent/${id}`,
    createAgent: '/agent',
}

export default {
    getAgentsList: (): GetAgentsResponseType => axiosInstanceInternal.get(requestUrl.getAgentsList),
    createAgent: (payload: CreateAgentInputs): CreateAgentResponseType => axiosInstanceInternal.post(requestUrl.createAgent, payload),
    getSelectedAgent: (id: number): ResponseType<AgentResponseData> => axiosInstanceInternal.get(requestUrl.getSelectedAgent(id)),
}
