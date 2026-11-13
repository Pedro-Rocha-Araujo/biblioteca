'use client'

import { useRouter } from "next/navigation"
import NavButton from "@/components/nav-button/NavButton"
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

        <NavButton 
          color="green"
          icon="fa-solid fa-list"
          text="Usuários cadastrados"
          path="/private/users/list"
        />

        <NavButton 
          color="yellow"
          icon="fa-solid fa-circle-plus"
          text="Cadastrar Usuário"
          path="/private/users/post"
        />
        
      </nav>
    </section>
  )
}