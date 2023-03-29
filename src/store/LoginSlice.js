import {createSlice} from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name: 'login slice',
    initialState: false,
    reducers:{
        login(state){
            return state = true
        },
        logout(state){
            return state = false
        }
    }
})

export const loginActions = LoginSlice.actions
export const loginReducer = LoginSlice.reducer