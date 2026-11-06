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
          Livros em falta
        </button>
        
        <button onClick={()=>router.push("/private/loans/over-due")} className="yellow">
          Empréstimos vencidos
        </button>
        
        <button onClick={()=>router.push("/private/loans/post")} className="green">
          Realizar empréstimo
        </button>
        
        <button onClick={()=>router.push("/private/users/ranking")} className="blue">
          Ranking de leitores
        </button>
      </nav>
    </section>
  );
}
