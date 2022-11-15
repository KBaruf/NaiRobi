import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPass } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('You do not have an Account!');
        }

        const isValid = await verifyPass(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error('Password is incorrect');
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
};
export default NextAuth(authOptions);
