import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPass } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
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
});
