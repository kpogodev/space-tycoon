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
    getAgents: '/agent/list',
    createAgent: '/agent',
}

export default {
    getAgents: (): GetAgentsResponseType => axiosInstanceInternal.get(requestUrl.getAgents),
    createAgent: (payload: CreateAgentInputs): CreateAgentResponseType => axiosInstanceInternal.post(requestUrl.createAgent, payload),
}
