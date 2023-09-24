export interface AgentResponseData {
    id: number,
    symbol: string,
    faction: string,
    token: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
}

export interface CreateAgentInputs {
    symbol: string,
    faction: string,
}

type OnlyOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<U[keyof U]>

type PatchableFields = {
    avatar: string,
    faction: string,
}

export type PatchAgentInputs = OnlyOne<PatchableFields>