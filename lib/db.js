import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect('mongodb+srv://Bkosgei-Ecom:IBlrr6jvA721zApD@cluster0.wp3zycl.mongodb.net/comfy-sloth?retryWrites=true&w=majority');
  return client;
};
