import { axiosInstanceInternal } from '@/config/axiosConfig'
import { AxiosResponse } from 'axios'
import type { AgentResponseData, CreateAgentInputs, PatchAgentInputs } from '@/types/account'


type ResponseData<T> = {
    success: boolean
    data: T
}
type ResponseType<T> = Promise<AxiosResponse<ResponseData<T>>>

type AgentsResponseData = Pick<AgentResponseData, 'id'| 'symbol' | 'faction' | 'avatar'>
type GetAgentsResponseType = ResponseType<AgentsResponseData[]>
type CreateAgentResponseType = ResponseType<AgentResponseData>


const requestUrl = {
    getAgentsList: '/agent/list',
    createAgent: '/agent',
    getSelectedAgent: (id: string | number) => `/agent/${id}`,
    patchAgent: (id: string | number) => `/agent/${id}`,
}

export default {
    getAgentsList: (): GetAgentsResponseType => axiosInstanceInternal.get(requestUrl.getAgentsList),
    createAgent: (payload: CreateAgentInputs): CreateAgentResponseType => axiosInstanceInternal.post(requestUrl.createAgent, payload),
    getSelectedAgent: (id: number): ResponseType<AgentResponseData> => axiosInstanceInternal.get(requestUrl.getSelectedAgent(id)),
    patchAgent: (id: number, payload: PatchAgentInputs): ResponseType<AgentResponseData> => axiosInstanceInternal.patch(requestUrl.patchAgent(id), payload),
}
