'use client'

import { useState, useEffect } from "react"
import { UserInterface } from "@/interfaces/usersInterface"
import { apiUsers } from "@/api"
import Cookies from "js-cookie"
import "./list.css"

export default function ListUsers() {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [listagem, setListagem] = useState<UserInterface[]>([])
  const [pesquisa, setpesquisa] = useState<string>("")
  const token = Cookies.get("token")

  useEffect(()=> {
    async function getUsers() {
      if(!token) {
        return
      }
      try {
        const response = await apiUsers.get("/")
        setUsers(response.data)
        setListagem(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getUsers()
  }, [])

  useEffect(()=> {
    setListagem(users.filter((user)=> {
      return user.name.includes(pesquisa)
    }))
  }, [pesquisa])

  return (
    <section className="list">

      <div className="heading">
        <h1> <i className="fa-solid fa-address-book"></i> Usuários</h1>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar"
            type="text"
            onChange={(e)=>setpesquisa(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      
      <div className="users">

        { users.length > 0 ? (
          listagem.map((user)=> {
            return (
              <div key={user.id} className="user">
                <h3>{user.name}</h3>
                <i className="fa-solid fa-eye fa-lg"></i>
              </div>
            )
          })
        ) : (
          <span className="erro">Nenhum usuário cadastrado ainda</span>
        ) }

      </div>
    </section>
  )
}