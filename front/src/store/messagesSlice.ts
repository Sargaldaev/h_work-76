import { createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../type';
import { fetchData, fetchDataDatetime, postData } from './messagesThunk';

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


    builder.addCase(fetchData.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.fetchLoad = false;
      state.messages = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.fetchLoad = false;
    });


    builder.addCase(fetchDataDatetime.fulfilled, (state, action) => {

      const filtereMessages: IMessage[] = [];

      action.payload.forEach(item => {
        let Item = false;
        state.messages.forEach(message => {
          Item = item.id === message.id ? false : true;
        });
        if (Item) filtereMessages.push(item);
      });

      state.messages = [...state.messages, ...filtereMessages];

    });
  },
});

export const messagesReducer = messagesSlice.reducer;
