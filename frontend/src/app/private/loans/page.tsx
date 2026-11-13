'use client'

import { useRouter } from "next/navigation"
import NavButton from "@/components/nav-button/NavButton"
import "@/app/nav-buttons.css"
import Header from "@/components/header/Header"

export default function Loans() {
  const router = useRouter()
  
  return (
    <section className="navegacao">
      <Header 
        title="Empréstimos"
        icon="fa-solid fa-handshake"
      />
      
      <nav className="navegacao">

        <NavButton 
          color="green"
          icon="fa-solid fa-list"
          text="Empréstimos em aberto"
          path="/private/loans/list"
        />

        <NavButton 
          color="yellow"
          icon="fa-solid fa-circle-plus"
          text="Cadastrar empréstimo"
          path="/private/loans/post"
        />

      </nav>
    </section>
  )
}