'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { BookInterface } from "@/interfaces/usersInterface"
import axios from "axios"
import { apiBooks } from "@/api"
import Cookies from "js-cookie"
import { toast } from "react-toastify" 
import "./book-detail.css"

export default function UserDetails() {
  const router = useRouter()
  const params = useParams()

  const [book, setBook] = useState<BookInterface>()
  const [quantity, setQuantity] = useState<number>(0)
  
  const token = Cookies.get("token")
  const book_id = params.book_id

  useEffect(()=> {
    async function getUser() {
      if(!token) {
        return
      }
      try {
        const response = await apiBooks.get(`/${book_id}`)
        setBook(response.data)
        setQuantity(response.data.quantity)
      } catch(erro) {
        console.log(erro)
      }
    }
    getUser()
  }, [book_id, token])

  function handleQuantity(q:boolean) {
    if(q === false) {
      if(quantity === 0) {
        toast.error("Valor inválido!")
        return
      }
      setQuantity(quantity - 1)
      return
    }
    setQuantity(quantity + 1)
  }

  async function editBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const isbn = formData.get("isbn")
    const title = formData.get("title")
    const author = formData.get("author")
    if(!title || !author) {
      return toast.error("Preencha todos os campos")
    }
    try {
      await apiBooks.put(`/${book_id}`, {
        isbn, title, author, quantity
      })
      toast.success("Livro atualizado")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Servidor Inativo.")
          return
        }
        switch (erro.response?.status) {
          case 401:
            toast.error("Faça o login novamente.")
            break
          case 404:
            toast.error("Livro não encontrado.")
            break
          case 409:
            toast.error(erro.response.data.Mensagem)
            break
          default:
            toast.error("Erro! Tente novamente.")
        }
      } else {
        toast.error("Erro inesperado")
      }
    }
  }

  async function deleteBook() {
    if(!book_id) {
      toast.error("Livro não encontrado")
    }
    try {
      await apiBooks.delete(`/${book_id}`)
      router.push("/private/books/list")
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
            toast.error("Usuário não encontrado.")
            break
          case 409:
            toast.error(erro.response.data.Mensagem)
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
    <section className="book-details">

      <h1>Detalhes do Livro</h1>
      <form onSubmit={editBook} className="form-post-book">
        <h2> <i className="fa-solid fa-pen-to-square"></i> Editar informações</h2>
        <input 
          placeholder="Digite o ISBN do livro"
          type="text"
          name="isbn"
          defaultValue={book?.isbn}
          
        />
        <input 
          placeholder="Digite o título do livro"
          type="text"
          name="title"
          defaultValue={book?.title}
          required
        />
        <input 
          placeholder="Digite o autor do livro"
          type="text"
          name="author"
          defaultValue={book?.author}
          required
        />
        <label>Quantidade</label>
        <div className="quantity">
          <button onClick={()=>handleQuantity(false)} type="button">-</button>
          <span>{quantity}</span>
          <button onClick={()=>handleQuantity(true)} type="button">+</button>
        </div>
        <button type="submit">Salvar</button>
        <button onClick={deleteBook} type="button">Excluir Livro</button>
      </form>

    </section>
  )
}