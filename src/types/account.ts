import type { agentAvatarList } from '@/utils/agentAvatarImporter'

//ensure that only one property from the given object can be present
type OnlyOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<U[keyof U]>

type AgentAvatar = keyof typeof agentAvatarList
export interface AgentResponseData {
    id: number
    symbol: string
    faction: string
    token: string
    avatar: AgentAvatar | null
    createdAt: string
    updatedAt: string
    userId: number
}

type PatchableFields = Pick<AgentResponseData, 'faction' | 'avatar'>

export type CreateAgentInputs = Pick<AgentResponseData, 'symbol' | 'faction'>
export type PatchAgentInputs = OnlyOne<PatchableFields>
