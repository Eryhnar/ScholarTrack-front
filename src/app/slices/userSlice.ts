import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    role: string;
    // profilePicture?: string;
}

export interface UserState {
    credentials: {
        token: string;
        user: User;
    };
}

const initialState: UserState = {
    credentials: {
        token: "",
        user: {
            id: "",
            name: "",
            role: "",
            // profilePicture: ""
        }
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState['credentials']>) => {
            state.credentials = action.payload;
        },
        logout: (state) => {
            state.credentials = initialState.credentials;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            state.credentials.user = { 
                ...state.credentials.user, 
                ...action.payload 
            };
        }
    }
});

export const { login, logout, updateUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;