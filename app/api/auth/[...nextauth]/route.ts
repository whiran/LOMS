import NextAuth, { AuthOptions, Profile } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { user } from '@prisma/client';
import { JWT } from 'next-auth/jwt';
import { Session, User, Account } from "next-auth";;

//authentication handler 

export const authOptions: AuthOptions = {
     

  providers: [
      CredentialsProvider({
          name: 'credentials',
          
          credentials: {
              email: {
                  label: 'Email',
                  type: 'text',
                  placeholder: 'your@email.com'
              },
              password: {
                  label: 'Password',
                  type: 'password'
              }
          },
          authorize: async (credentials) => {
              if(!credentials) {
                  return null;
              }

              const { email, password } = credentials;

              const user = await prisma.user.findUnique({
                  where: {
                      email
                  }
              });

              if(!user) {
                return null;
            }
            const userPassword = user.password;

            const userType = user.userType;

            const isValidPassword = bcrypt.compareSync(password, userPassword);

            if(!isValidPassword){
                return null;
            }
           
            return user;

            }
          })
        
      ],
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
      },
      session: {
        strategy: 'jwt',
        maxAge: 30 * 25 * 60 * 60,
        updateAge: 24 * 60 * 60,
      },
      
      callbacks: 
      
      {

        async jwt({token ,user, trigger, session}) {
            if(trigger === 'update'){
                return { ...token, ...session.user}
            }
            if(user) {
                token.userType = user.userType;
                token.id = user.id; 
            }
            return token;
        },

        async session({ session, token}) {
            if(session?.user) {   
                session.user.id = token.id as string
                session.user.userType = token.userType as string;   
            }
            return session;
        }
        
    }
    }

    const handler = NextAuth(authOptions);

    export { handler as GET, handler as POST};