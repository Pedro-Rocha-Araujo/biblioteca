'use client'

import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { apiBooks } from "@/api"
import { BookInterface } from "@/interfaces/usersInterface"
import Header from "@/components/header/Header"
import "./post-book.css"

export default function PostBook() {
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<BookInterface>({
    defaultValues: { isbn: "", title: "", author: "", genre: "", quantity: 1 }
  })

  async function postBook(data:BookInterface) {
    const { isbn, title, author, genre, quantity } = data
    try {
      await apiBooks.post("/",{ isbn, title, author, quantity, genre })
      reset()
      toast.success("Livro cadastrado")
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
      <Header 
        icon="fa-solid fa-circle-plus"
        title="Cadastrar Livro"
      />

      <form onSubmit={handleSubmit(postBook)} className="form-post-book">
        
        <div className="input">
          <label htmlFor="isbn">ISBN do Livro:</label>
          <input 
            type="text"
            id="isbn"
            {...register("isbn", {
              setValueAs: (value: string) => value.trim()
            })}
          />
        </div>

        <div className="input">
          <label htmlFor="titulo">Título do Livro:</label>
          <input 
            type="text"
            id="titulo"
            {...register("title", {
              setValueAs: (value: string) => value.trim(),
              required: "Informe o título do livro",
              minLength: {
                value: 2,
                message: "O título deve ter pelo menos 2 caracteres"
              }
            })}
          />
          {errors.title && <span className="span-erro">{errors.title.message}</span>}
        </div>

        <div className="input">
          <label htmlFor="autor">Autor do Livro:</label>
          <input 
            type="text"
            id="autor"
            {...register("author", {
              setValueAs: (value: string) => value.trim(),
              required: "Informe o autor do livro"
            })}
          />
          {errors.author && <span className="span-erro">{errors.author.message}</span>}
        </div>

        <div className="input">
          <label htmlFor="genero">Gênero:</label>
          <select
            {...register("genre", {
              required: "Selecione um gênero"
            })} 
          >
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

        <div className="input">
          <label htmlFor="quantidade">Quantidade:</label>
          <input 
            type="number"
            {...register("quantity", {
              valueAsNumber: true,
              required: "Informe a quantidade de livros",
              min: { value: 1, message: "Informe um valor válido" }
            })}
            id="quantidade"
          />
          { errors.quantity && <span className="span-erro">{errors.quantity.message}</span> }
        </div>

        <button disabled={isSubmitting}>{isSubmitting?"Carregando":"Cadastrar"}</button>

      </form>
    </section>
  )
}