import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const rotaAtual = request.nextUrl.pathname

  
  if(rotaAtual === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
  if(rotaAtual.startsWith("/private")) {
    if(!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_PASSWORD
      )
      await jwtVerify(token, secret)
    } catch(erro) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      )
      response.cookies.delete("token")
      return response
    }
  }
  return NextResponse.next()
}