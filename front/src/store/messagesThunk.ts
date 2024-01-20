import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMessageCreate } from '../type';
import axiosApi from '../axiosApi';

export const postData = createAsyncThunk<void,IMessageCreate>(
  'message/postData',
  async (arg) => {
    await axiosApi.post('/messages',arg);
  }
);