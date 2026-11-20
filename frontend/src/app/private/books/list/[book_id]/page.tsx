'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BookInterface } from "@/interfaces/usersInterface"
import axios from "axios"
import { apiBooks } from "@/api"
import { toast } from "react-toastify" 
import "./book-detail.css"
import Header from "@/components/header/Header"

export default function UserDetails() {
  const router = useRouter()
  const params = useParams()

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<BookInterface>()

  const [book, setBook] = useState<BookInterface>()

  const book_id = params.book_id

  useEffect(()=> {
    async function getUser() {
      try {
        const response = await apiBooks.get(`/${book_id}`)
        setBook(response.data)
        setQuantity(response.data.quantity)
        reset({
          isbn: response.data.isbn ?? "",
          title: response.data.title,
          author: response.data.author,
          genre: response.data.genre,
          quantity: response.data.quantity,
        })
      } catch(erro) {
        console.log(erro)
      }
    }
    getUser()
  }, [book_id, reset])


  const [quantity, setQuantity] = useState<number>(0)

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

  async function editBook(data:BookInterface) {
    const { isbn, title, author, genre } = data
    try {
      await apiBooks.put(`/${book_id}`, {
        isbn, title, author, quantity, genre
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
            toast.error("Livro não encontrado.")
            break
          case 409:
            toast.error("O livro possui pendências")
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
      <Header 
        icon="fa-solid fa-circle-info"
        title="Detalhes do Livro"
      />

      <form onSubmit={handleSubmit(editBook)} className="form-post-book">
        <h2> <i className="fa-solid fa-pen-to-square"></i> Editar informações</h2>

        <div className="input">
          <label htmlFor="isbn">ISBN do Livro:</label>
          <input 
            type="text"
            id="isbn"
            { ...register("isbn", { 
              setValueAs: (value:string)=>value.trim() 
             }) }
          />
          { errors.isbn && <span className="span-erro">{errors.isbn.message}</span> }
        </div>

        <div className="input">
          <label htmlFor="titulo">Título do Livro:</label>
          <input 
            type="text"
            { ...register("title", {
              setValueAs: (value:string) => value.trim(),
              required: "Informe o Título do livro",
              min: { value: 1, message: "O Título precisa ter pelo menos 2 caracteres" }
            }) }
            id="titulo"
            required
          />
          { errors.title && <span className="span-erro">{errors.title.message}</span> }
        </div>

        <div className="input">
          <label htmlFor="autor">Autor do Livro:</label>
          <input 
            type="text"
            { ...register("author", {
              setValueAs: (value:string) => value.trim(),
              required: "Informe o Autor do Livro",
              min: { value: 2, message: "O nome do autor precisa ter pelo menos 2 caracteres " }
            }) }
            id="autor"
            required
          />
          { errors.author && <span className="span-erro">{errors.author.message}</span> }
        </div>

        <div className="input">
          <label htmlFor="genero">Gênero:</label>
          <select id="genero" { ...register("genre") } >
            <option value="" disabled>Selecione o Gênero</option>
            <option value="Drama">Drama</option>
            <option value="Terror">Terror</option>
            <option value="Romance">Romance</option>
            <option value="Ficção">Ficção</option>
            <option value="Politica">Política</option>
            <option value="Educativo">Educativo</option>
            <option value="Outro">Outro</option>
          </select>
          { errors.genre && <span className="span-erro">{errors.genre.message}</span> }
        </div>

        <label>Quantidade</label>
        <div className="quantity">
          <button onClick={()=>handleQuantity(false)} type="button">-</button>
          <span>{quantity}</span>
          <button onClick={()=>handleQuantity(true)} type="button">+</button>
        </div>
        { errors.quantity && <span className="span-erro">{errors.quantity.message}</span> }

        <button disabled={isSubmitting} type="submit">{isSubmitting?"Salvando":"Salvar"}</button>
        <button onClick={deleteBook} type="button">Excluir Livro</button>
      </form>

    </section>
  )
}