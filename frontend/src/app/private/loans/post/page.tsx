'use client'

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { apiLoans } from "@/api"
import { apiUsers, apiBooks } from "@/api"
import { UserInterface, BookInterface } from "@/interfaces/usersInterface"
import ListBooks from "./list/Books"
import ListUsers from "./list/Users"
import "./post-loan.css"

export default function PostLoan() {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [books, setBooks] = useState<BookInterface[]>([])

  const [usersList, setUsersList] = useState<UserInterface[]>([])
  const [booksList, setBooksList] = useState<BookInterface[]>([])

  const [userSearch, setUserSearch] = useState<string>("")
  const [bookSearch, setBookSearch] = useState<string>("")

  const [bookSelected, setBookSelected] = useState<number | null>(null)
  const [userSelected, setUserSelected] = useState<number | null>(null)

  useEffect(()=> {
    async function getInfos() {
      try {
        const getUsers = await apiUsers.get("/")
        const getBooks = await apiBooks.get("/")
        setUsers(getUsers.data)
        setBooks(getBooks.data)
        setUsersList(getUsers.data)
        setBooksList(getBooks.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getInfos()
  }, [])


  useEffect(()=> {
    setBooksList(books.filter((book)=> {
      return book.title.toLocaleLowerCase().includes(bookSearch.toLocaleLowerCase())
    }))
  }, [bookSearch]) 
  
  useEffect(()=> {
    setUsersList(users.filter((user)=> {
      return user.email.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())
    }))
  }, [userSearch]) 


  function manageBookSelected(id:number) {
    setBookSelected(id)
  }
  function manageUserSelected(id:number) {
    setUserSelected(id)
  }

  async function cadastrarEmprestimo(e:React.FormEvent) {
    e.preventDefault()
    if(!bookSelected || !userSelected) {
      toast.error("Preencha todos os campos")
      return
    }
    try {
      await apiLoans.post("/",
        { 
          book_id: bookSelected,
          user_id: userSelected
        }
      )
      setBookSearch("")
      setUserSearch("")
      setBookSelected(null)
      setUserSelected(null)
      toast.success("Empréstimo cadastrado")
    } catch(erro) {
      console.log(erro)
    }
  }

  return (
    <section className="post-loan">
      <h1> <i className="fa-solid fa-circle-plus"></i> Novo Empréstimo</h1>

      <form onSubmit={cadastrarEmprestimo} className="form-post-loan">

        <h2> <i className="fa-solid fa-book"></i> Selecione o Livro</h2>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar Nome do Livro"
            value={bookSearch}
            onChange={(e)=>setBookSearch(e.target.value)}
            type="text"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <ListBooks 
          books={booksList}
          bookSelected={bookSelected}
          setBookSelected={manageBookSelected}
        />

        <h2> <i className="fa-solid fa-user"></i> Selecione o Usuário</h2>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar Usuário pelo E-mail"
            type="text"
            value={userSearch}
            onChange={(e)=>setUserSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <ListUsers 
          users={usersList}
          userSelected={userSelected}
          setUserSelected={manageUserSelected}
        />

        <button>Cadastrar</button>
      </form>
    </section>
  )
}