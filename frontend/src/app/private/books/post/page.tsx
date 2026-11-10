'use client'

import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import axios from "axios"
import { apiBooks } from "@/api"
import "./post-book.css"

export default function PostBook() {
  const router = useRouter()

  async function postBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const isbn = formData.get("isbn")
    const title = formData.get("title")
    const author = formData.get("author")
    const quantity = formData.get("quantity")
    if(!title || !author || !quantity) {
      toast.error("Preencha todos os campos")
      return
    }
    try {
      await apiBooks.post("/",{ isbn, title, author, quantity })
      router.push("/private/books/list")
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
          case 400:
            toast.error("Dado(s) inválido(s).")
            break
          case 409:
            toast.error("Livro já cadastrado")
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
        
        <div className="input">
          <label htmlFor="isbn">ISBN do Livro:</label>
          <input 
            type="text"
            name="isbn"
            id="isbn"
          />
        </div>

        <div className="input">
          <label htmlFor="titulo">Título do Livro:</label>
          <input 
            type="text"
            name="title"
            id="titulo"
            required
          />
        </div>

        <div className="input">
          <label htmlFor="autor">Autor do Livro:</label>
          <input 
            type="text"
            name="author"
            id="autor"
            required
          />
        </div>

        <div className="input">
          <label htmlFor="quantidade">Quantidade:</label>
          <input 
            type="number"
            name="quantity"
            id="quantidade"
            required
          />
        </div>

        <button>Cadastrar</button>

      </form>
    </section>
  )
}