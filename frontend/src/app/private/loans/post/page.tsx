'use client'

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { apiUsers, apiBooks } from "@/api"
import { UserInterface, BookInterface } from "@/interfaces/usersInterface"
import ListBooks from "./list/Books"
import ListUsers from "./list/Users"
import "./post-loan.css"

export default function PostLoan() {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [books, setBooks] = useState<BookInterface[]>([])

  useEffect(()=> {
    async function getInfos() {
      try {
        const getUsers = await apiUsers.get("/")
        const getBooks = await apiBooks.get("/")
        setUsers(getUsers.data)
        setBooks(getBooks.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getInfos()
  }, [])

  return (
    <section className="post-loan">
      <h1> <i className="fa-solid fa-circle-plus"></i> Novo Empréstimo</h1>

      <form className="form-post-loan">

        <h2> <i className="fa-solid fa-book"></i> Selecione o Livro</h2>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar Livro"
            type="text"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <ListBooks 
          books={books}
        />

        <h2> <i className="fa-solid fa-user"></i> Selecione o Usuário</h2>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar Usuário"
            type="text"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <ListUsers 
          users={users}
        />

        <button>Cadastrar</button>
      </form>
    </section>
  )
}