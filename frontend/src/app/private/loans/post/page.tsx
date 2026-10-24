'use client'

import { toast } from "react-toastify"
import axios from "axios"
import { apiUsers } from "@/api"
import "./post-loan.css"

export default function PostUser() {

  async function postLoan(e: React.FormEvent<HTMLFormElement>) {
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
          case 401:
            toast.error("Faça o login novamente.")
            break
          case 404:
            toast.error("Recurso não encontrado.")
            break
          case 409:
            toast.error(erro.response.data.Mensagem || "Esse usuário já está cadastrado.")
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

      <form onSubmit={postLoan} className="form-post-user">
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