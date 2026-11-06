'use client'

import { useRouter } from "next/navigation"
import "@/app/nav-buttons.css"

export default function Books() {
  const router = useRouter()

  return (
    <section className="navegacao">
      <header>
        <h1> <i className="fa-solid fa-user"></i> Usuários</h1>
      </header>
      <nav className="navegacao">
        <button onClick={()=>router.push("/private/users/list")} className="green">
          <i className="fa-solid fa-list fa-xl"></i> Usuários cadastrados
        </button>

        <button onClick={()=>router.push("/private/users/post")} className="yellow">
          <i className="fa-solid fa-circle-plus fa-xl"></i> Cadastrar Usuário
        </button>
      </nav>
    </section>
  )
}