'use client'

import { useRouter } from "next/navigation"
import "@/app/nav-buttons.css"

export default function Loans() {
  const router = useRouter()
  
  return (
    <section className="navegacao">
      <header>
        <h1> <i className="fa-solid fa-handshake"></i> Empréstimos</h1>
      </header>
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