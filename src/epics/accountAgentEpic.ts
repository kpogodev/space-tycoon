import { toast } from 'react-toastify'
import { combineEpics, ofType } from 'redux-observable'
import { from, mergeMap, catchError, startWith, endWith } from 'rxjs'
import { axiosErrorHandler } from '@/utils/axiosErrorHandler'
import accountApi from '@/api/accountApi'
import {
    createAgent,
    createAgentSuccess,
    createAgentFailure,
    getAgents,
    getAgentsSuccess,
    getAgentsFailure,
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
                    console.log(res.data.data.token)
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
                })
            )
        })
    )
}

const getAgentsEpic: Epic = (action$: ActionsType) => {
    return action$.pipe(
        ofType(getAgents.type),
        mergeMap(() => {
            return from(accountApi.getAgents()).pipe(
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

export default combineEpics(createAgentEpic, getAgentsEpic)
