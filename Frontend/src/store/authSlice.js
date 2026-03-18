import { createSlice } from '@reduxjs/toolkit';

const AUTH_STORAGE_KEY = 'lq_auth';
const TOKEN_STORAGE_KEY = 'lq_access_token';

const readPersistedAuth = () => {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
};

const persistedAuth = readPersistedAuth();

const initialState = persistedAuth ?? {
    isAuthenticated: false,
    accessToken: null,
    expiresIn: 0,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const payload = action.payload;
            state.isAuthenticated = true;
            state.accessToken = payload.accessToken;
            state.expiresIn = payload.expiresIn ?? 0;
            state.user = payload.user ?? null;

            const nextAuth = {
                isAuthenticated: true,
                accessToken: state.accessToken,
                expiresIn: state.expiresIn,
                user: state.user
            };

            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
            if (state.accessToken) {
                localStorage.setItem(TOKEN_STORAGE_KEY, state.accessToken);
            }
        },
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.expiresIn = 0;
            state.user = null;

            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;
export { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY };
export default authSlice.reducer;
