import { combineEpics, ofType } from 'redux-observable'
import { from, mergeMap, catchError, startWith } from 'rxjs'
import { axiosErrorHandler } from '@/utils/axiosErrorHandler'
import accountApi from '@/api/accountApi'
import {
    createAgent,
    createAgentSuccess,
    createAgentFailure,
    getAgents,
    getAgentsSuccess,
    getAgentsFailure,
    getSelectedAgent,
    getSelectedAgentSuccess,
    getSelectedAgentFailure,
    setIsLoading
} from '@/features/accountAgentsSlice'
import type { Observable } from 'rxjs'

type ActionsType = Observable<any>
type Epic = (action$: ActionsType) => Observable<any>

const createAgentEpic: Epic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(createAgent.type),
        mergeMap((action: ReturnType<typeof createAgent>) => {
            return from(accountApi.createAgent(action.payload)).pipe(
                mergeMap((res) => {
                    return [
                        createAgentSuccess({
                            id: res.data.data.id,
                            symbol: res.data.data.symbol,
                            faction: res.data.data.faction,
                        }),
                    ]
                }),
                catchError((err) => {
                    axiosErrorHandler(err)
                    return [createAgentFailure()]
                }),
                startWith(setIsLoading(true)),
            )
        })
    )
}

const getAgentsListEpic: Epic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(getAgents.type),
        mergeMap(() => {
            return from(accountApi.getAgentsList()).pipe(
                mergeMap((res) => {
                    return [
                        getAgentsSuccess(res.data.data),
                    ]
                }),
                catchError((err) => {
                    axiosErrorHandler(err)
                    return [getAgentsFailure()]
                })
            )
        })
    )
}

const getSelectedAgentEpic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(getSelectedAgent.type),
        mergeMap((action: ReturnType<typeof getSelectedAgent>) => {
            return from(accountApi.getSelectedAgent(action.payload.id)).pipe(
                mergeMap((res) => {
                    const selectAccountAgentData = res.data.data

                    if (selectAccountAgentData.token) {
                        sessionStorage.setItem('spacetraders-token', selectAccountAgentData.token)
                    }

                    return [
                        getSelectedAgentSuccess(selectAccountAgentData),
                    ]
                }),
                catchError((err) => {
                    axiosErrorHandler(err)
                    return [getSelectedAgentFailure()]
                }),
                startWith(setIsLoading(true)),
            )
        }),
    )
}


export default combineEpics(createAgentEpic, getAgentsListEpic, getSelectedAgentEpic)
