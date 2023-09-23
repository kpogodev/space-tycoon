import { combineReducers } from "@reduxjs/toolkit";
import authSlice from '@/features/authSlice'
import accountAgentsSlice from '@/features/accountAgentsSlice'

export default combineReducers({
    auth: authSlice,
    account: combineReducers({
        agents: accountAgentsSlice,
    }),
})