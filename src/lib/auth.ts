import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from '@/db';
import type { User } from '@prisma/client';

async function getUser(name: string): Promise<User | null> {
  try {
    const user = await db.user.findFirst({
      where: {
        name,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);

        // console.log('credentials: ', credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
          console.log('USER in auth.ts AUTHORIZE: ', user);
          if (!user) return null;
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      console.log('USER in JWT callback: ', user);
      console.log('TOKEN BEFORE modification in JWT callback: ', token);
      if (token && user) {
        token.role = user.role;
        token.id = user.id;
      }
      console.log('TOKEN AFTER modification in JWT callback: ', token);
      return token;
    },
    async session({ session, token, user }: any) {
      console.log('USER in SESSION callback: ', user);
      console.log('TOKEN BEFORE modification in SESSION callback: ', token);
      console.log('SESSION BEFORE modification in SESSION callback: ', session);
      if (session && token) {
        session.user.id = token.id;
        session.user.role = token.role;

        console.log('SESSION AFTER modification in SESSION callback: ', session);
      }

      return session;
    },
  },
  pages: {
    signIn: '/src/components/auth/sign-in-form',
  },
});
