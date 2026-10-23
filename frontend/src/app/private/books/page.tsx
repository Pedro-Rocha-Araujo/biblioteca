'use client'

import { useRouter } from "next/navigation"
import "./books.css"

export default function Books() {
  const router = useRouter()

  return (
    <section className="books">
      <h1> <i className="fa-solid fa-book"></i> Livros</h1>
      <nav className="navegacao">

        <button onClick={()=>router.push("/private/books/list")} className="green">
          Livros cadastrados
        </button>

        <button onClick={()=>router.push("/private/books/post")} className="yellow">
          Cadastrar Livro
        </button>

      </nav>
    </section>
  )
}