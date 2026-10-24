'use client'

import { useState, useEffect } from "react"
import { apiLibrarians } from "@/api"
import { LibrarianInterface } from "@/interfaces/usersInterface"
import Cookies from "js-cookie"
import "./profile.css"

export default function Profile() {
  const token = Cookies.get("token")

  const [librarian, setLibrarian] = useState<LibrarianInterface | null>(null)


  useEffect(()=> {
    async function getLibrarianProfile() {
      if(!token) {
        return
      }
      try {
        const response = await apiLibrarians.get("/")
        setLibrarian(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getLibrarianProfile()
  }, [token])

  return (
    <section className="profile">
      <h1> <i className="fa-solid fa-circle-user"></i> Perfil</h1>

      <form className="update-user-profile">
        <input 
          placeholder="Digite seu nome"
          defaultValue={librarian?.name}
          type="text"
        />
        <input 
          placeholder="Digite seu e-mail"
          defaultValue={librarian?.email}
          type="email"
        />
        <button>Salvar alterações</button>
      </form>
    </section>
  )
}