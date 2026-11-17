'use client'

import { useState, useEffect } from "react"
import { UserInterface } from "@/interfaces/usersInterface"
import { apiUsers } from "@/api"
import "./ranking.css"
import Header from "@/components/header/Header"

export default function RankingUsers() {
  const [users, setUsers] = useState<UserInterface[]>([])

  useEffect(()=> {
    async function getUsers() {
      try {
        const response = await apiUsers.get("/ranking")
        setUsers(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getUsers()
  }, [])

  return (
    <section className="ranking">
      <Header 
        icon="fa-solid fa-trophy"
        title="Ranking"
      />
      
      <div className="users">

        { users.length > 0 ? (
          users.map((user, i)=> {
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