'use client'

import { toast } from "react-toastify"
import { apiUsers } from "@/api"
import "./post-user.css"

export default function PostUser() {

  async function postUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const name = formData.get("name")
      const email = formData.get("email")
      if(!name || !email) {
        toast.error("Preencha todos os campos")
      }
      const response = await apiUsers.post("/",{
          name, email
      })
      console.log(response)
    } catch(erro) {
      console.log(erro)
      toast.error("Erro")
    }
  }

  return (
    <section className="post-user">
      <h1> <i className="fa-solid fa-circle-plus"></i> Cadastrar Usuário</h1>

      <form onSubmit={postUser} className="form-post-user">
        <input 
          placeholder="Digite o nome do usuário"
          type="text"
          name="name"
        />
        <input 
          placeholder="Digite o e-mail do usuário"
          type="email"
          name="email"
        />
        <button>Cadastrar</button>
      </form>
    </section>
  )
}