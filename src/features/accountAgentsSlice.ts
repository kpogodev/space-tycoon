import { createSlice, createAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { CreateAgentInputs, PatchAgentInputs, AgentResponseData } from '@/types/account'

type Agent = Pick<AgentResponseData, 'id' | 'symbol' | 'faction' | 'avatar' | 'createdAt'>

interface AccountAgentsState {
    list: Agent[]
    listIsLoading: boolean
    selected: AgentResponseData | null
    selectedIsLoading: boolean
}

const initialState: AccountAgentsState = {
    list: [],
    listIsLoading: false,
    selected: null,
    selectedIsLoading: false,
}

const accountAgentsSlice = createSlice({
    name: 'accountAgents',
    initialState,
    reducers: {
        getAgentsSuccess: (state, action: PayloadAction<Agent[]>) => {
            state.list = action.payload
            state.listIsLoading = false
        },
        getAgentsFailure: (state) => {
            state.listIsLoading = false
        },
        getSelectedAgentSuccess: (state, action: PayloadAction<AgentResponseData>) => {
            state.selected = action.payload
            state.selectedIsLoading = false
        },
        getSelectedAgentFailure: (state) => {
            state.selectedIsLoading = false
        },
        createAgentSuccess: (state, action: PayloadAction<Agent>) => {
            state.list.push(action.payload)
            state.listIsLoading = false
        },
        createAgentFailure: (state) => {
            state.listIsLoading = false
        },
        patchAgentSuccess: (state, action: PayloadAction<AgentResponseData>) => {
            state.list = state.list.map((agent) =>
                agent.id === action.payload.id
                    ? {
                          id: action.payload.id,
                          symbol: action.payload.symbol,
                          faction: action.payload.faction,
                          avatar: action.payload.avatar,
                          createdAt: action.payload.createdAt,
                      }
                    : agent
            )
            state.selected = state.selected && state.selected.id === action.payload.id ? action.payload : state.selected
            state.listIsLoading = false
        },
        patchAgentFailure: (state) => {
            state.listIsLoading = false
        },
        deleteAgentSuccess: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((agent) => agent.id !== action.payload)
            state.listIsLoading = false
        },
        deleteAgentFailure: (state) => {
            state.listIsLoading = false
        },
        setListIsLoading: (state, action: PayloadAction<boolean>) => {
            state.listIsLoading = action.payload
        },
        setSelectedIsLoading: (state, action: PayloadAction<boolean>) => {
            state.selectedIsLoading = action.payload
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
    setListIsLoading,
    setSelectedIsLoading,
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
export const selectAccountAgentsIsLoading = (state: RootState) => state.account.agents.listIsLoading
export const selectAccountAgentsList = (state: RootState) => state.account.agents.list
export const selectAgentFromListById = (id: Agent['id']) => (state: RootState) =>
    state.account.agents.list.find((agent) => agent.id === id)

export default accountAgentsSlice.reducer
