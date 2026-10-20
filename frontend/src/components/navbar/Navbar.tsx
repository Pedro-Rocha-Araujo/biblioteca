'use client'

import "./navbar.css"
import NavElement from "./NavElement"

interface navProps {
  nav: boolean,
  manageNav: ()=>void
}

export default function Navbar({ nav, manageNav }: navProps) {
  return (
    <nav className="side-nav">
      <div className="perfil">

        <NavElement 
          icon="fa-solid fa-home fa-xl"
          label="Home"
          link="/private/home"
        />

      </div>

      <ul>
        <NavElement 
          icon="fa-solid fa-book fa-xl"
          label="Livros"
          link="/private/books"
        />

        <NavElement 
          icon="fa-solid fa-user fa-xl"
          label="Usuários"
          link="/private/books"
        />

        <NavElement 
          icon="fa-solid fa-handshake fa-xl"
          label="Empréstimos"
          link="/private/loans"
        />

        <NavElement 
            icon="fa-solid fa-circle-user fa-xl"
            label="Perfil"
            link="/private/home"
          />

        <div className="manage-nav" onClick={manageNav}>
          { nav === true ? (
            <NavElement 
              icon="fa-solid fa-angles-left fa-xl"
              label="Fechar"
            />
          ) : (
            <NavElement 
              icon="fa-solid fa-angles-right fa-xl"
              label="Abrir"
            />
          ) }
        </div>
        <NavElement 
          icon="fa-solid fa-right-from-bracket fa-xl"
          label="Sair"
        />
      </ul>


    </nav>
  )
}