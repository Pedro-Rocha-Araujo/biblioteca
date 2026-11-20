'use client'

import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { apiBooks } from "@/api"
import { BookInterface } from "@/interfaces/usersInterface"
import Header from "@/components/header/Header"
import "@/app/form-style.css"
import "./post-book.css"

export default function PostBook() {
  const { 
    register, handleSubmit, reset, watch, setValue, formState: { isSubmitting, errors } 
  } = useForm<BookInterface>({
    defaultValues: { isbn: "", title: "", author: "", genre: "", quantity: 1 }
  })

  const quantity = watch("quantity")

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

  function handleQuantity(q:boolean) {
    if(q === false) {
      if(quantity === 0) {
        toast.error("Valor inválido!")
        return
      }
      setValue("quantity", quantity - 1)
      return
    }
    setValue("quantity", quantity + 1)
  }

  return (
    <section className="post-book">
      <Header 
        icon="fa-solid fa-circle-plus"
        title="Cadastrar Livro"
      />

      <form onSubmit={handleSubmit(postBook)} className="form-post-book post">
        
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
          <label>Quantidade:</label>
          <div className="quantity">
            <button onClick={()=>handleQuantity(false)} type="button">-</button>
            <span>{quantity}</span>
            <button onClick={()=>handleQuantity(true)} type="button">+</button>
          </div>
        </div>

        <button disabled={isSubmitting}>{isSubmitting?"Carregando":"Cadastrar"}</button>

      </form>
    </section>
  )
}