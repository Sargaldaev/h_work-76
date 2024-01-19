export interface IMessages {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export interface ICreateMessage {
  author: string;
  message: string;
}