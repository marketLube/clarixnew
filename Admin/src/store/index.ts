import { configureStore } from '@reduxjs/toolkit';
import collegeReducer from './slices/collegeSlice';
// import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        college: collegeReducer,
        // auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
