'use client'

import { useState, useEffect } from "react"
import { apiLibrarians } from "@/api"
import { LibrarianInterface } from "@/interfaces/usersInterface"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
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

  async function editLibrarianProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")
    if(!name || !email) {
      toast.error("Preencha todos os campos")
      return
    }
    try {
      await apiLibrarians.put("/", {
        name, email
      })
      toast.success("Perfil atualizado")
    } catch(erro) {
      console.log(erro)
    }
  }

  return (
    <section className="profile">
      <h1> <i className="fa-solid fa-circle-user"></i> Perfil</h1>

      <form onSubmit={editLibrarianProfile} className="update-user-profile">
        <input 
          placeholder="Digite seu nome"
          defaultValue={librarian?.name}
          name="name"
          type="text"
          required
        />
        <input 
          placeholder="Digite seu e-mail"
          defaultValue={librarian?.email}
          name="email"
          type="email"
          required
        />
        <button>Salvar alterações</button>
      </form>
    </section>
  )
}