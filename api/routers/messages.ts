import express from 'express';
import {ICreateMessage} from '../type';
import fileDb from '../fileDb';

const messagesRouter = express.Router();


messagesRouter.post('/', async (req, res) => {

  const message: ICreateMessage = {
    author: req.body.author,
    message: req.body.message
  };

  const saveMessage = await fileDb.addItem(message);

  res.send(saveMessage);
});


export default messagesRouter;