import express from 'express';
import fileDb from './fileDb';

const app = express();
const port = 8000;

app.use(express.json());

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`server running in ${port} port`);
  });
};

run().catch(e => console.error(e));

