// store.ts
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers/modalSlice';
import tweetReducer from './reducers/tweetSlice';
import userReducer from './reducers/userSlice';
import authReducer from './reducers/authSlice';
import authMiddleware from '../auth/authMiddleware';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    tweets: tweetReducer,
    users: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
