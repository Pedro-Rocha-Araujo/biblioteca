'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoanInterface } from "@/interfaces/usersInterface"
import { apiLoans } from "@/api"
import "./list.css"

export default function ListLoans() {
  const router = useRouter()

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

  function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "UTC"
    })
  }

  function getRemainingDays(dueDate: string | Date): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const difference = due.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  }

  return (
    <section className="loan">
      <h1> <i className="fa-solid fa-handshake"></i> Empréstimos</h1>
      
      <div className="loans">

        { loans.length > 0 ? (
          loans.map((loan)=> {
            return (
              <div key={loan.id} onClick={()=>router.push(`/private/loans/list/${loan.id}`)} className="loan">
                <h3><strong>Usuário:</strong> {loan.user.name}</h3>
                <span><strong>Bibliotecário:</strong> {loan.librarian.name}</span>
                <span><strong>Livro:</strong> {loan.book.title}</span>
                <span><strong>Data:</strong> {formatDate(loan.loanDate)}</span>
                <div className="infos">
                  <span><strong>Prazo:</strong> {formatDate(loan.dueDate)}</span>
                  <span><strong>Dias restantes:</strong> {getRemainingDays(loan.dueDate)}</span>
                </div>
                <i className="fa-solid fa-eye fa-lg"></i>
              </div>
            )
          })
        ) : (
          <span className="erro">Nenhum empréstimo em aberto</span>
        ) }

      </div>
    </section>
  )
}