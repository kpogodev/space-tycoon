import { createSlice, createAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { CreateAgentInputs, PatchAgentInputs, AgentResponseData } from '@/types/account'


type Agent = Pick<AgentResponseData, 'id' | 'symbol' | 'faction' | 'avatar'>

interface AccountAgentsState {
    agents: Agent[]
    selectedAgent: Agent | null
    isLoading: boolean
}

const initialState: AccountAgentsState = {
    agents: [],
    selectedAgent: null,
    isLoading: false,
}

const accountAgentsSlice = createSlice({
    name: 'accountAgents',
    initialState,
    reducers: {
        getAgentsSuccess: (state, action: PayloadAction<Agent[]>) => {
            state.agents = action.payload
            state.isLoading = false
        },
        getAgentsFailure: (state) => {
            state.isLoading = false
        },
        getSelectedAgentSuccess: (state, action: PayloadAction<Agent>) => {
            state.selectedAgent = action.payload
            state.isLoading = false
        },
        getSelectedAgentFailure: (state) => {
            state.isLoading = false
        },
        createAgentSuccess: (state, action: PayloadAction<Agent>) => {
            state.agents.push(action.payload)
            state.isLoading = false
        },
        createAgentFailure: (state) => {
            state.isLoading = false
        },
        patchAgentSuccess: (state, action: PayloadAction<Agent>) => {
            state.agents = state.agents.map((agent) => (agent.id === action.payload.id ? action.payload : agent))
            state.selectedAgent =
                state.selectedAgent && state.selectedAgent.id === action.payload.id
                    ? action.payload
                    : state.selectedAgent
            state.isLoading = false
        },
        patchAgentFailure: (state) => {
            state.isLoading = false
        },
        deleteAgentSuccess: (state, action: PayloadAction<number>) => {
            state.agents = state.agents.filter((agent) => agent.id !== action.payload)
            state.isLoading = false
        },
        deleteAgentFailure: (state) => {
            state.isLoading = false
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

// Automatically generated action creators
export const {
    getAgentsSuccess,
    getAgentsFailure,
    getSelectedAgentSuccess,
    getSelectedAgentFailure,
    createAgentSuccess,
    createAgentFailure,
    deleteAgentSuccess,
    deleteAgentFailure,
    patchAgentSuccess,
    patchAgentFailure,
    setIsLoading,
} = accountAgentsSlice.actions

// Manually set action creators
export const getAgents = createAction('accountAgents/getAgents')
export const getSelectedAgent = createAction('accountAgents/getSelectedAgent', (id: number) => ({
    payload: { id },
}))
export const patchAgent = createAction('accountAgents/patchAgent', (id: number, payload: PatchAgentInputs) => ({
    payload: { id, payload },
}))
export const createAgent = createAction('accountAgents/createAgent', ({ symbol, faction }: CreateAgentInputs) => ({
    payload: { symbol, faction },
}))
export const deleteAgent = createAction('accountAgents/deleteAgent', (id: number) => ({
    payload: { id },
}))

// Selectors
export const selectAccountAgentsIsLoading = (state: RootState) => state.account.agents.isLoading
export const selectAccountAgents = (state: RootState) => state.account.agents.agents

export default accountAgentsSlice.reducer
