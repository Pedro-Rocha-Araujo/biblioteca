'use client'

import { toast } from "react-toastify"
import axios from "axios"
import { apiBooks } from "@/api"
import "./post-book.css"

export default function PostBook() {

  async function postBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const isbn = formData.get("isbn")
    const title = formData.get("title")
    const author = formData.get("author")
    const quantity = formData.get("quantity")
    if(!title || !author || !quantity) {
      console.log(title, author, quantity)
      toast.error("Preencha todos os campos")
    }
    try {
      await apiBooks.post("/",{ isbn, title, author, quantity })
      toast.success("Livro cadastrado!")
      formData.delete("isbn")
      formData.delete("title")
      formData.delete("author")
      formData.delete("quantity")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Servidor Indisponível.")
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
            toast.error(erro.response.data.Mensagem || "Esse livro já possui cadastro")
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
    <section className="post-book">
      <h1> <i className="fa-solid fa-circle-plus"></i> Cadastrar Livro</h1>

      <form onSubmit={postBook} className="form-post-book">
        <input 
          placeholder="Digite o isbn (Opicional)"
          type="text"
          name="isbn"
        />
        <input 
          placeholder="Digite o nome do livro"
          type="text"
          name="title"
          required
        />
        <input 
          placeholder="Digite o nome do autor"
          type="text"
          name="author"
          required
        />
        <input 
          placeholder="Digite a quantidade"
          type="number"
          name="quantity"
          required
        />
        <button>Cadastrar</button>
      </form>
    </section>
  )
}