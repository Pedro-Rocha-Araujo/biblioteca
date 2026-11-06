'use client'

import { useRouter } from "next/navigation"
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

        <button onClick={()=>router.push("/private/loans/list")} className="green">
          <i className="fa-solid fa-list fa-xl"></i> Empréstimos em aberto
        </button>

        <button onClick={()=>router.push("/private/loans/post")} className="yellow">
          <i className="fa-solid fa-circle-plus fa-xl"></i> Cadastrar empréstimo
        </button>

      </nav>
    </section>
  )
}