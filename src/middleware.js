import { NextResponse,NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log(request)
    const path=request.nextUrl.pathname

    const token=request.cookies.get("Token")?.value

    if(path==="/account/orders" && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(token && path === "/login"){
        return NextResponse.redirect(new URL('/account/orders', request.url))
    }

  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/account/orders"
  ]
}