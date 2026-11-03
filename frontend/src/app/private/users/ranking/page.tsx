'use client'

import { useState, useEffect } from "react"
import { UserInterface } from "@/interfaces/usersInterface"
import { apiUsers } from "@/api"
import "./ranking.css"

export default function RankingUsers() {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [listagem, setListagem] = useState<UserInterface[]>([])
  const [pesquisa, setpesquisa] = useState<string>("")

  useEffect(()=> {
    async function getUsers() {
      try {
        const response = await apiUsers.get("/ranking")
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
      return user.name.toLowerCase().includes(pesquisa.toLowerCase())
    }))
  }, [pesquisa])

  return (
    <section className="list">

      <div className="heading">
        <h1> <i className="fa-solid fa-trophy"></i> Ranking</h1>
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
          listagem.map((user, i)=> {
            return (
              <div key={i} className="user">
                <h3>{user.name}</h3>
                <span><strong>Leituras: </strong> {user.totalLoans}</span>
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