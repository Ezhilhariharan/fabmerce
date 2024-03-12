import {createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    authToken: null,
}

export const authSlice = createSlice({
    name : "authendication",
    initialState,
    reducers:{
        updateAuthToken:(state,action)=>{
            state.authToken = action.payload
        }
    }
})

export const { updateAuthToken} = authSlice.actions

export default authSlice.reducer