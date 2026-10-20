'use client'

import { useRouter } from "next/navigation"
import "./users.css"

export default function Books() {
  const router = useRouter()

  return (
    <section className="users">
      <h1> <i className="fa-solid fa-user"></i> Usuários</h1>
      <nav className="navegacao">
        <button className="green">
          Usuários cadastrados
        </button>

        <button onClick={()=>router.push("/private/users/post")} className="yellow">
          Cadastrar Usuário
        </button>
      </nav>
    </section>
  )
}