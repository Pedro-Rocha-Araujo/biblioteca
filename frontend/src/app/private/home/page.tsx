'use client'

import { useRouter } from "next/navigation"; 
import "./home.css"

export default function Home() {
  const router = useRouter()

  return (
    <section className="home">
      <h1> <i className="fa-solid fa-home"></i> Home!</h1>
      <div className="buttons">
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
      </div>
    </section>
  );
}
