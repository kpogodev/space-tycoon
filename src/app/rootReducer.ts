import { combineReducers } from "@reduxjs/toolkit";
import authSlice from '@/features/auth/authSlice'

export default combineReducers({
    auth: authSlice,
})