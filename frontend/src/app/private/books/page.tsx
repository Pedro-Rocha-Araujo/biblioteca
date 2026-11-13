'use client'

import Header from "@/components/header/Header"
import NavButton from "@/components/nav-button/NavButton"
import "@/app/nav-buttons.css"

export default function Books() {

  return (
    <section className="navegacao">
      <Header 
        title="Livros"
        icon="fa-solid fa-book"
      />

      <nav className="navegacao">

        <NavButton 
          color="green"
          icon="fa-solid fa-list"
          text="Livros cadastrados"
          path="/private/books/list"
        />

        <NavButton 
          color="yellow"
          icon="fa-solid fa-circle-plus"
          text="Cadastrar Livro"
          path="/private/books/post"
        />

      </nav>
    </section>
  )
}