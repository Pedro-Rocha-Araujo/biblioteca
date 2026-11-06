'use client'

import { useRouter } from "next/navigation"
import Header from "@/components/header/Header"
import "@/app/nav-buttons.css"

export default function Books() {
  const router = useRouter()

  return (
    <section className="navegacao">
      <Header 
        title="Livros"
        icon="fa-solid fa-book"
      />

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