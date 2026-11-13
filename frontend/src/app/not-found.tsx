'use client'

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import "./not-found.css"

export default function NotFound() {
  const router = useRouter()

  const token = Cookies.get("token")

  const rota = token ? "/private/home" : "/auth/login"

  return (
    <div className="background-nf">
      <div className="not-found">
        <h1>Erro!</h1>
        <span>Página não encontrada.</span>
        <button onClick={()=>router.push(rota)}>
          {token ? "Ir para a home" : "Fazer Login"}
        </button>
      </div>
    </div>
  )
}