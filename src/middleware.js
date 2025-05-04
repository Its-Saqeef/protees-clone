import { NextResponse,NextRequest } from 'next/server'
import jwt from "jsonwebtoken"


export function middleware(request) {
    const path=request.nextUrl.pathname

    const token=request.cookies.get("Token")?.value

    if((path==="/account/orders" || path.includes(`/account/orders/Order-`) || path.includes(`/dashboard`) ) && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(token){
      const decodedValue =jwt.decode(token,process.env.TOEKN_SECRET)    

      if(decodedValue.role !=="admin" && path.includes("/dashboard")){
        return NextResponse.redirect(new URL('/', request.url))
      }

      if((decodedValue.role ==="user" || decodedValue.role ==="admin") && path === "/login"){
          return NextResponse.redirect(new URL('/account/orders', request.url))
      }
    }
  
}
 
export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/account/orders/:path*",    
  ]
}