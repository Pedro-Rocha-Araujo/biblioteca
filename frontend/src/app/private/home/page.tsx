'use client'

import Header from "@/components/header/Header"
import NavButton from "@/components/nav-button/NavButton"
import "@/app/nav-buttons.css"

export default function Home() {

  return (
    <section className="navegacao">
      <Header 
        title="Home"
        icon="fa-solid fa-home"
      />

      <nav className="navegacao home">

        <NavButton 
          color="red"
          icon="fa-solid fa-arrow-trend-down"
          text="Livros sem Estoque"
          path="/private/books/out-of-print"
        />
        <NavButton 
          color="yellow"
          icon="fa-solid fa-ban"
          text="Empréstimos Vencidos"
          path="/private/loans/over-due"
        />
        <NavButton 
          color="green"
          icon="fa-solid fa-handshake"
          text="Realizar Empréstimo"
          path="/private/loans/post"
        />
        <NavButton 
          color="blue"
          icon="fa-solid fa-trophy"
          text="Ranking de Leitores"
          path="/private/users/ranking"
        />        
      </nav>
    </section>
  );
}
