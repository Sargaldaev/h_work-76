import express from 'express';
import {ICreateMessage} from '../type';
import fileDb from '../fileDb';

const messagesRouter = express.Router();


messagesRouter.post('/', async (req, res) => {

  if (!req.body.author || !req.body.message) {
    res.status(400).send({'error': 'Author and message must be present in the request'});
  }

  const message: ICreateMessage = {
    author: req.body.author,
    message: req.body.message
  };

  if (!message.author || !message.message) {
    res.status(400).send({'error': 'Author and message must be present in the request'});
  }
  const saveMessage = await fileDb.addItem(message);

  res.send(saveMessage);
});

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();

  const lastMessages = messages.slice(-30);


  if (req.query.datetime) {
    const queryDate = req.query.datetime as string;
    const date = new Date(queryDate);

    if (isNaN(date.getDate())) {
      return res.status(400).send({'error': 'Invalid datetime'});
    }

    const indexDateMessage = messages.findIndex(msg => msg.datetime === queryDate);

    const remainingMessages = messages.slice(indexDateMessage + 1);

    res.send(remainingMessages);
  } else {
    res.send(lastMessages);
  }
});


export default messagesRouter;