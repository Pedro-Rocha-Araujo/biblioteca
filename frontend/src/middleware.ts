import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const rotaAtual = request.nextUrl.pathname

  if(rotaAtual.startsWith("/private") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
  if(rotaAtual.endsWith("/")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
  return NextResponse.next()
}