import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchData, fetchDataDatetime } from '../../store/messagesThunk';
import { Box, Typography } from '@mui/material';
import Form from '../Form/Form';
import dayjs from 'dayjs';

const Chat = () => {
  const { messages,fetchLoad } = useSelector((state: RootState) => state.message);
  const [datetime, setDatetime] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();

  const run = useCallback(async () => {
    if (!messages.length) {
      await dispatch(fetchData());
    }
    if (messages.length && messages[messages.length - 1].datetime !== datetime) {
      setDatetime(messages[messages.length - 1].datetime);
    }
  }, [dispatch, messages, datetime]);

  useEffect(() => {
    run().catch(e => console.error(e));
  }, [run]);

  useEffect(() => {
    if (datetime) {
      const interval = setInterval(async () => {
        await dispatch(fetchDataDatetime(datetime));
        if (messages.length > 0) {
          setDatetime(messages[messages.length - 1].datetime);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [datetime, dispatch, messages]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && messages.length && messages[messages.length - 1].datetime !== datetime) {
      const containerElement: HTMLDivElement = containerRef.current;
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [messages, datetime]);

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        marginTop: '40px',
      }}
    >
      <Box
        component="div"
        ref={containerRef}
        maxHeight="500px"
        sx={{
          overflowY: 'scroll',
          borderRadius: '10px',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'lightgray',
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}
        border="4px solid #000"
        padding="20px"
      >

        {

          fetchLoad ? "Load..." :

          messages.map(item => {
          const messageDate = dayjs(item.datetime);

          const formattedDate =
            messageDate.isSame(dayjs(), 'day')
              ? messageDate.format('HH:mm')
              : messageDate.isSame(dayjs().subtract(1, 'day'), 'day')
                ? 'Вчера'
                : messageDate.isBefore( dayjs(),'year')
                  ? messageDate.format('DD MMMM')
                  : messageDate.format('MM-DD');

          return (
            <Box key={item.id} sx={{ width: '500px',position:'relative' }}>
              <Box
                component="div"
                sx={{
                  padding: '20px',
                  marginBottom: '10px',
                  background: 'rgb(106, 90, 205)',
                  color:'white',
                  borderRadius:'10px'
                }}
              >
                <Typography>
                  <b> Author: </b>
                  {item.author}
                </Typography>
                <Typography>
                  <b> Message: </b>
                  {item.message}
                </Typography>
                <Typography
                  sx={{position:'absolute',right:'15px',top:'10px'}}
                > <b> Datetime: </b>{formattedDate}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Form />

    </Box>
  );
};

export default Chat;
