import { createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../type';
import { postData } from './messagesThunk';

interface MessagesState {
  messages: IMessage[];
  fetchLoad: boolean;
  postLoad: boolean;
}

const initialState: MessagesState = {
  messages: [],
  fetchLoad: false,
  postLoad: false
};

export const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(postData.pending, (state) => {
      state.postLoad = true;
    });
    builder.addCase(postData.fulfilled, (state) => {
      state.postLoad = false;
    });
    builder.addCase(postData.rejected, (state) => {
      state.postLoad = false;
    });
  },
});

export const messagesReducer = messagesSlice.reducer;
