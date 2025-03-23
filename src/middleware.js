import { NextResponse,NextRequest } from 'next/server'



export function middleware(request) {
    const path=request.nextUrl.pathname

    const token=request.cookies.get("Token")?.value

    

    if((path==="/account/orders" || path.includes(`/account/orders/Order-`)) && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(token && path === "/login"){
        return NextResponse.redirect(new URL('/account/orders', request.url))
    }

  
}
 
export const config = {
  matcher: [
    "/login",
    "/account/orders/:path*",
  ]
}