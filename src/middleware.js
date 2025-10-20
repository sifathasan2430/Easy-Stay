import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
   const token=req.nextauth.token
   const {pathname}=req.nextUrl
   
        
                 if (pathname.startsWith('/host') ){
            
               
                 if (token?.role === "host" || token?.role === "admin") {
                       return NextResponse.next() 
                      }
                 return NextResponse.redirect(new URL("/unauthorized", req.url))
                  }

                   if (pathname.startsWith('/dashboard/guest') ){
            
               
                 if (token?.role === "user" || token?.role === "admin") {
                       return NextResponse.next() 
                      }
                 return NextResponse.redirect(new URL("/unauthorized", req.url))
                  }
                   if (pathname.startsWith('/dash/admin') ){
            
               
                 if ( token?.role === "admin") {
                       return NextResponse.next() 
                      }
                 return NextResponse.redirect(new URL("/unauthorized", req.url))
                  }
  return  NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({req, token }) => {
     
        const {pathname}=req.nextUrl
    
         if ( pathname.startsWith("/host") || pathname.startsWith("/stays/") || pathname.startsWith("/dashboard/guest") || pathname.startsWith("/dash/admin") ){
                    return !!token;
                }
                if (pathname === '/stays') {
                    return true;
                }

      }
    },
  },
)

export const config = { matcher: ["/stays/:path*","/host/:path*","/dashboard/guest/:path*","/dash/admin/:path*"] }