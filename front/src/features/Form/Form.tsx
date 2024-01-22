import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../store/messagesThunk';
import { IMessageCreate } from '../../type';
import SendIcon from '@mui/icons-material/Send';


const Form = () => {
  const dispatch: AppDispatch = useDispatch();
  const {postLoad} = useSelector((state: RootState) => state.message);

  const [messages, setMessages] = useState<IMessageCreate>({
    author: '',
    message: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setMessages(prevState => ({...prevState, [name]: value}));
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messages.message || !messages.author) {
      alert('Заполните все поля');
    } else {
      await dispatch(postData(messages));

      setMessages({author: '', message: ''});
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      sx={{'& > :not(style)': {m: 1}, background: 'rgb(180, 180, 180)', borderRadius: '20px', marginTop: '10px'}}

    >
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        <TextField
          id="input-with-sx"
          label="Author"
          variant="standard"
          name="author"
          onChange={onChange}
          value={messages.author}
        />
      </Box>

      <TextField
        id="filled-multiline-static"
        label="Message"
        multiline
        rows={2}
        variant="filled"
        name="message"
        onChange={onChange}
        value={messages.message}
      />
      <Button variant="contained" type="submit">
        {
          postLoad ? 'load' :
            <SendIcon/>
        }
      </Button>
    </Box>
  );
};

export default Form;
