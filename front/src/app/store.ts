import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from '../store/messagesSlice';

export const store = configureStore({
  reducer: {
    message:messagesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;