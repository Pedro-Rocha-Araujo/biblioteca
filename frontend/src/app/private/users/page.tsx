'use client'

import { useRouter } from "next/navigation"
import Header from "@/components/header/Header"
import "@/app/nav-buttons.css"

export default function Books() {
  const router = useRouter()

  return (
    <section className="navegacao">
      <Header 
        title="Usuários"
        icon="fa-solid fa-user"
      />

      <nav className="navegacao">
        <button onClick={()=>router.push("/private/users/list")} className="green">
          <i className="fa-solid fa-list"></i> Usuários cadastrados
        </button>

        <button onClick={()=>router.push("/private/users/post")} className="yellow">
          <i className="fa-solid fa-circle-plus"></i> Cadastrar Usuário
        </button>
      </nav>
    </section>
  )
}