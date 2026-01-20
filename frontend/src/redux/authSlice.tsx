import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../types/userType"

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
        },
        verifyEmail: (state,action) => {
            if (state.auth?.user) {
                state.auth.user.email_verified = action.payload
            }
        }
    }
})

export const {setUser,removeUser,verifyEmail} = authSlice.actions;
export default authSlice.reducer;