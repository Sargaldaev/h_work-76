import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMessage, IMessageCreate } from '../type';
import axiosApi from '../axiosApi';

export const postData = createAsyncThunk<void,IMessageCreate>(
  'message/postData',
  async (arg) => {
    await axiosApi.post('/messages',arg);
  }
);



export const fetchData = createAsyncThunk<IMessage[]>(
  'message/data',
  async () => {
    const {data} = await axiosApi<IMessage[]>('/messages');
    return data;
  }
);

export const fetchDataDatetime = createAsyncThunk<IMessage[],string>(
  'message/dataDatetime',
  async (arg) => {
    const {data} = await axiosApi<IMessage[]>(`/messages?datetime=${arg}`);
    return data;
  }
);