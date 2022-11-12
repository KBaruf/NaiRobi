import { hashPassword } from '../../lib/auth';
import { connectToDatabase } from '../../lib/db';

async function clientHandler(req, res) {
  //   connect to magoDb
  if (req.method !== 'POST') return;

  const data = req.body;
  const { email, password } = data;

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };
  const checkEmail = validateEmail(email);
  if (!email || !checkEmail) {
    res.status(422).json({ message: 'Please Enter a Valid Email' });
    return;
  }
  if (!password || password.trim().length < 6) {
    res.status(201).json({ message: 'Password needs to be atleat 6 characters' });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();

  // check if user Exists
  const existingUser = await db.collection('users').findOne({
    email: email,
  });
  if (existingUser) {
    res.status(200).json({ message: 'Account Exists, Please Login' });
    client.close();
    return;
  }

  const hashPass = await hashPassword(password);
  const result = await db.collection('users').insertOne({
    email: email,
    password: hashPass,
  });
  res.status(201).json({ message: 'Account Created!' });
  client.close();
}
export default clientHandler;
