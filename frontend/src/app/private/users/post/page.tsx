'use client'

import { toast } from "react-toastify"
import axios from "axios"
import { apiUsers } from "@/api"
import "./post-user.css"

export default function PostUser() {

  async function postUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")
    if(!name || !email) {
      toast.error("Preencha todos os campos")
    }
    try {
      await apiUsers.post("/",{ name, email })
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Não foi possível conectar ao servidor.")
          return
        }
        switch (erro.response?.status) {
          case 400:
            toast.error("Dado(s) inválido(s).")
            break
          case 401:
            toast.error("Faça o login novamente.")
            break
          case 404:
            toast.error("Usuário não encontrado")
            break
          case 409:
            toast.error("E-mail já cadastrado")
            break
          default:
            toast.error("Erro! Tente novamente.")
        }
      } else {
        toast.error("Erro inesperado")
      }
    }
  }

  return (
    <section className="post-user">
      <h1> <i className="fa-solid fa-circle-plus"></i> Cadastrar Usuário</h1>

      <form onSubmit={postUser} className="form-post-user">

        <div className="input">
          <label htmlFor="nome">Nome do Usuário:</label>
          <input 
            type="text"
            name="name"
            id="nome"
            required
          />
        </div>

        <div className="input">
          <label htmlFor="email">Email do Usuário:</label>
          <input 
            type="email"
            name="email"
            id="email"
            required
          />
        </div>

        <button>Cadastrar</button>

      </form>
    </section>
  )
}