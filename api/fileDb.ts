import {promises as fs} from 'fs';
import {ICreateMessage, IMessages,} from './type';
import {randomUUID} from 'crypto';


const filename = './db.json';
let data: IMessages[] = [];

const fileDb = {

  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: ICreateMessage) {

    const product = {
      ...item,
      id: randomUUID(),
      datetime: new Date().toISOString()
    };
    data.push(product);

    await this.save();
    return product.id;

  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  }

};

export default fileDb;