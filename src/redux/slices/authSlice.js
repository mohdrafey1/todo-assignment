import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    isAuthenticated: false,
    error: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        signOut: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = false;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, signOut } =
    authSlice.actions;
export default authSlice.reducer;
