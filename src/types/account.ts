export interface AgentResponseData {
    id: number,
    symbol: string,
    faction: string,
    token: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
}

export interface CreateAgentInputs {
    symbol: string,
    faction: string,
}