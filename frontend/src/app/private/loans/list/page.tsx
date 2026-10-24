'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserInterface } from "@/interfaces/usersInterface"
import { apiUsers } from "@/api"
import Cookies from "js-cookie"
import "./list.css"

export default function ListLoans() {
  const router = useRouter()
  
  const token = Cookies.get("token")

  return (
    <section className="loan">

      <div className="heading">
        <h1> <i className="fa-solid fa-handshake"></i> Empréstimos</h1>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar"
            type="text"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      
      <div className="loans">

        <div className="loan">
          <h3><strong>Usuário:</strong> Pedro Rocha</h3>
          <span><strong>Bibliotecário:</strong> João da silva</span>
          <span><strong>Livro:</strong> O príncipe</span>
          <span><strong>Data:</strong> 10/10/1010</span>
          <div className="infos">
            <span><strong>Prazo:</strong> 15/10/1010</span>
            <span><strong>Dias restantes:</strong> 5</span>
          </div>
          <i className="fa-solid fa-eye fa-lg"></i>
        </div>

        {/* { .length > 0 ? (
          .map(()=> {
            return (
              <div onClick={()=> router.push("/private/users/list/"+.id)} key={.id} className="user">
                <h3>{.name}</h3>
                <i className="fa-solid fa-eye fa-lg"></i>
              </div>
            )
          })
        ) : (
          <span className="erro">Nenhum empréstimo em aberto</span>
        ) } */}

      </div>
    </section>
  )
}