import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../features/user/userType"

interface AuthState {
    auth: User | null;
}

const initialState : AuthState = {
    auth: null, 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state,action: PayloadAction<User>) => {
            state.auth = action.payload
        },
        removeUser: (state) => {
            state.auth = null
        }
    }
})

export const {setUser,removeUser} = authSlice.actions;
export default authSlice.reducer;