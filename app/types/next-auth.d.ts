import NextAuth, { DefaultSession, DefaultUser} from "next-auth"
import {JWT, DefaultJWT} from "next-auth/jwt"
import prisma from "../lib/prisma"

type CustomType = string


declare module "next-auth" {
  interface Session {
    user: {
      type: string
      userType: string
      id: string
    } & DefaultSession["user"]
  } 

  interface user extends DefaultUser{
    userType:string,
    id:string,
  }
}


declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userType: string,
    id: string,
  }
}