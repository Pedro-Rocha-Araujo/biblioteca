'use client'

import { useRouter } from "next/navigation"
import "@/app/nav-buttons.css"

export default function Books() {
  const router = useRouter()

  return (
    <section className="navegacao">
      <header>
        <h1><i className="fa-solid fa-book"></i> Livros</h1>
      </header>

      <nav className="navegacao">

        <button onClick={()=>router.push("/private/books/list")} className="green">
          <i className="fa-solid fa-list fa-xl"></i> Livros cadastrados
        </button>

        <button onClick={()=>router.push("/private/books/post")} className="yellow">
          <i className="fa-solid fa-circle-plus fa-xl"></i> Cadastrar Livro
        </button>

      </nav>
    </section>
  )
}