'use client'

import { useRouter } from "next/navigation"
import "./loans.css"

export default function Loans() {
  const router = useRouter()
  
  return (
    <section className="loans">
      <h1> <i className="fa-solid fa-handshake"></i> Empréstimos</h1>
      <nav className="navegacao">

        <button onClick={()=>router.push("/private/loans/list")} className="green">
          Empréstimos em aberto
        </button>

        <button onClick={()=>router.push("/private/loans/post")} className="yellow">
          Cadastrar empréstimo
        </button>

      </nav>
    </section>
  )
}