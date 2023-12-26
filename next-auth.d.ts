import { DefaultSession, DefaultUser} from "next-auth"
import {JWT, DefaultJWT} from "next-auth/jwt"


declare module "next-auth" {
  interface Session {
    user: {
      userType: string
      id: string
    } & DefaultSession["user"] //rest normal session
  } 

  interface User extends DefaultUser{
    userType:string,
  }
}


declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userType: string,
  }
}