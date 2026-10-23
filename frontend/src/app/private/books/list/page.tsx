'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookInterface } from "@/interfaces/usersInterface"
import { apiBooks } from "@/api"
import Cookies from "js-cookie"
import "./list.css"

export default function ListUsers() {
  const router = useRouter()

  const [books, setBooks] = useState<BookInterface[]>([])
  const [listagem, setListagem] = useState<BookInterface[]>([])
  const [pesquisa, setPesquisa] = useState<string>()
  
  const token = Cookies.get("token")

  useEffect(()=> {
    async function getBooks() {
      if(!token) {
        return
      }
      try {
        const response = await apiBooks("/")
        setBooks(response.data)
        setListagem(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getBooks()
  }, [])

  useEffect(()=> {
    setListagem(books.filter((user)=> {
     return user.title.toLowerCase().includes(pesquisa.toLowerCase())
    }))
  }, [pesquisa])

  return (
    <section className="list">

      <div className="heading">
        <h1> <i className="fa-solid fa-address-book"></i> Livros</h1>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar"
            type="text"
            onChange={(e)=>setPesquisa(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      
      <div className="books">

        { books.length > 0 ? (
          listagem.map((book)=> {
            return (
              <div onClick={()=> router.push("/private/books/list/"+book.id)} key={book.id} className="book">
                <h3>{book.title}</h3>
                <i className="fa-solid fa-eye fa-lg"></i>
              </div>
            )
          })
        ) : (
          <span className="erro">Nenhum livro cadastrado ainda</span>
        ) }

      </div>
    </section>
  )
}