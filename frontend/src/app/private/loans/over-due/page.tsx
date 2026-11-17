'use client'

import { useState, useEffect } from "react"
import { LoanInterface } from "@/interfaces/usersInterface"
import { apiLoans } from "@/api"
import LoanCard from "@/components/loanCard/LoanCard"
import "./over-due.css"
import Header from "@/components/header/Header"

export default function OverDue() {

  const [overDueLoans, setOverDueLoans] = useState<LoanInterface[]>([])

  useEffect(()=> {
    async function getLoans() {
      try {
        const response = await apiLoans("/over-due")
        console.log(response.data)
        setOverDueLoans(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getLoans()
  }, [])

  return (
    <section className="over-due-loans">
      <Header 
        icon="fa-solid fa-calendar-xmark"
        title="Empréstimos Vencidos"
      />
      
      <div className="over-due-loans">

        { overDueLoans.length > 0 ? (
          overDueLoans.map((loan)=> {
            return (
              <LoanCard 
                key={loan.id}
                loan={loan}
              />
            )
          })
        ) : (
          <span className="erro">Nenhum empréstimo vencido</span>
        ) }

      </div>
    </section>
  )
}