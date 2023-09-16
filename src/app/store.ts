import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '@/epics/rootEpic'

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
})

epicMiddleware.run(rootEpic)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
