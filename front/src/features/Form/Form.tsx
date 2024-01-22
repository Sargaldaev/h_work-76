import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { postData } from '../../store/messagesThunk';
import { IMessageCreate } from '../../type';


const Form = () => {
  const dispatch: AppDispatch = useDispatch();
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
      alert('Поле не должно быть пустым');
    } else {
      await dispatch(postData(messages));

         setMessages({author:'',message:''})
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      sx={{'& > :not(style)': {m: 1}}}
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
        rows={4}
        variant="filled"
        name="message"
        onChange={onChange}
        value={messages.message}
      />
      <Button variant="contained" type="submit">Send</Button>
    </Box>
  );
};

export default Form;
