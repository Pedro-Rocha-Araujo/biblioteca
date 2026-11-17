'use client'

import { useState, useEffect } from "react"
import { LoanInterface } from "@/interfaces/usersInterface"
import { apiLoans } from "@/api"
import LoanCard from "@/components/loanCard/LoanCard"
import "./list.css"
import Header from "@/components/header/Header"

export default function ListLoans() {

  const [loans, setLoans] = useState<LoanInterface[]>([])

  useEffect(()=> {
    async function getLoans() {
      try {
        const response = await apiLoans("/")
        setLoans(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getLoans()
  }, [])

  return (
    <section className="loan">
      <Header
        icon="fa-solid fa-handshake"
        title="Empréstimos"
      />
      
      <div className="loans">

        { loans.length > 0 ? (
          loans.map((loan)=> {
            return (
              <LoanCard 
                key={loan.id}
                loan={loan}
              />
            )
          })
        ) : (
          <span className="erro">Nenhum empréstimo em aberto</span>
        ) }

      </div>
    </section>
  )
}