'use client'

import { useRouter } from "next/navigation"
import Header from "@/components/header/Header"
import "@/app/nav-buttons.css"

export default function Home() {
  const router = useRouter()

  return (
    <section className="navegacao">
      <Header 
        title="Home"
        icon="fa-solid fa-home"
      />

      <nav className="navegacao home">
        <button onClick={()=>router.push("/private/books/out-of-print")} className="red">
          <i className="fa-solid fa-arrow-trend-down"></i> Livros sem Estoque
        </button>
        
        <button onClick={()=>router.push("/private/loans/over-due")} className="yellow">
          <i className="fa-solid fa-ban"></i> Empréstimos Vencidos
        </button>
        
        <button onClick={()=>router.push("/private/loans/post")} className="green">
          <i className="fa-solid fa-handshake"></i> Realizar Empréstimo
        </button>
        
        <button onClick={()=>router.push("/private/users/ranking")} className="blue">
          <i className="fa-solid fa-trophy"></i> Ranking de Leitores
        </button>
      </nav>
    </section>
  );
}
