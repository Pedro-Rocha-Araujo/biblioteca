'use client'

import { useState, useEffect } from "react"
import { LoanInterface } from "@/interfaces/usersInterface"
import { apiLoans } from "@/api"
import LoanCard from "@/components/loanCard/LoanCard"
import "./list.css"

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
      <h1> <i className="fa-solid fa-handshake"></i> Empréstimos</h1>
      
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