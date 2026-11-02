'use client'

import { useState, useEffect } from "react"
import { BookInterface } from "@/interfaces/usersInterface"
import { apiBooks } from "@/api"
import Cookies from "js-cookie"
import BookCard from "@/components/bookCard/BookCard"
import "./out-of-print.css"

export default function ListOutOfPrintBooks() {

  const [books, setBooks] = useState<BookInterface[]>([])
  const [listagem, setListagem] = useState<BookInterface[]>([])
  const [pesquisa, setPesquisa] = useState<string>()

  useEffect(()=> {
    async function getBooks() {
      try {
        const response = await apiBooks("/out-of-print")
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
     return user.title.toLowerCase().includes(pesquisa!.toLowerCase())
    }))
  }, [pesquisa])

  return (
    <section className="list">

      <div className="heading">
        <h1> <i className="fa-solid fa-address-book"></i> Livros em Falta</h1>
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
              <BookCard 
                key={book.id}
                book={book}
              />
            )
          })
        ) : (
          <span className="erro">Nenhum livro fora de estoque</span>
        ) }

      </div>
    </section>
  )
}