import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if( request.nextUrl.pathname.startsWith("/protected") && request.nextauth.token?.userType !== "admin"){

      return NextResponse.rewrite(
        new URL("/denied", request.url)
      )
    }
    else if(request.nextUrl.pathname.startsWith("/users") && request.nextauth.token?.userType !=="user"){
    
      return NextResponse.rewrite(
        new URL("/denied", request.url)
      )
    }else if(request.nextUrl.pathname.startsWith("/subuser") && request.nextauth.token?.userType !=="subuser"){
      return NextResponse.rewrite(
        new URL("/denied", request.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/protected/:path*","/users/:path","/subuser/:path"] }

//"/protected/user/path*","/protected/admin/path*"